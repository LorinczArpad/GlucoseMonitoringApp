import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import {
  PatientClient,
  PatientDTO,
  FileResponse,
} from '../../../services/httpClient/httpClient';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePickerModule } from 'primeng/datepicker';
import { Observable } from 'rxjs';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-patient-selector',
  standalone: true,
  templateUrl: './patient-selector.component.html',
  styleUrls: ['./patient-selector.component.css'],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    FormsModule,
    ConfirmDialogModule,
    DatePickerModule,
    Toast,
  ],
  providers: [ConfirmationService, MessageService],
})
export class PatientSelectorComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);
  patientClient = inject(PatientClient);
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);

  patients: PatientDTO[] = [];
  selectedPatient: PatientDTO | null = null;

  displayPatientDialog: boolean = false;
  patientDialogTitle: string = '';
  patientToEdit: PatientDTO | null = null;

  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    const user = this.authService.CurretUser;
    if (!user?.id) return;

    this.patientClient
      .getPatientsForDoctorPaged(user.id, this.pageNumber, this.pageSize)
      .subscribe({
        next: (res: any) => {
          this.patients = res.items || res.patients || [];
          this.totalCount = res.totalCount || this.patients.length;

          if (
            this.selectedPatient &&
            !this.patients.find((p) => p.id === this.selectedPatient?.id)
          ) {
            this.selectedPatient = null;
          }
        },
        error: (err) => {
          console.error('Error loading patients', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load patient list.',
          });
        },
      });
  }

  gotodetails() {
    this.router.navigate(['/patient-view', this.selectedPatient?.id]);
  }

  onPageChange(event: any) {
    this.pageNumber = event.page + 1;
    this.pageSize = event.rows;
    this.loadPatients();
  }

  openAddPatientDialog() {
    this.patientDialogTitle = 'Add New Patient';

    const doctorId = this.authService.CurretUser?.id;
    this.patientToEdit = new PatientDTO({
      id: 0,
      firstName: '',
      lastName: '',
      mothersName: '',
      birthDate: new Date(),
      insulinPump: '',
      cgmSensor: '',
      bodyWeight: 0,
      socketUrl: '',
      doctorId: doctorId || 0,
    });
    this.displayPatientDialog = true;
  }

  openEditPatientDialog(patient: PatientDTO) {
    this.patientDialogTitle = 'Edit Patient Details';

    this.patientToEdit = PatientDTO.fromJS(patient);
    this.displayPatientDialog = true;
  }

  savePatient() {
    if (!this.patientToEdit) return;

    const isNew = this.patientToEdit.id === 0;

    let observable: Observable<FileResponse>;
    let successMessage: string;

    if (isNew) {
      observable = this.patientClient.addPatient(this.patientToEdit);
      successMessage = 'Patient added successfully!';
    } else {
      observable = this.patientClient.updatePatient(this.patientToEdit);
      successMessage = 'Patient updated successfully!';
    }

    observable.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: successMessage,
        });
        this.displayPatientDialog = false;
        this.loadPatients();
      },
      error: (err: any) => {
        console.error('Error saving patient:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to save patient data.',
        });
      },
    });
  }

  deletePatient(patient: PatientDTO) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete patient ${patient.firstName} ${patient.lastName}? This action cannot be undone.`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.patientClient.deletePatient(patient.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Patient deleted successfully!',
            });

            if (this.selectedPatient?.id === patient.id) {
              this.selectedPatient = null;
            }
            this.loadPatients();
          },
          error: (err) => {
            console.error('Error deleting patient:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete patient.',
            });
          },
        });
      },
    });
  }
}
