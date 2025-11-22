import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import {
  PatientClient,
  PatientDTO,
} from '../../../services/httpClient/httpClient';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  mothersName: string;
  birthDate: Date;
  insulinPump: string;
  cgmSensor: string;
}

@Component({
  selector: 'app-patient-selector',
  standalone: true,
  templateUrl: './patient-selector.component.html',
  styleUrls: ['./patient-selector.component.css'], // corrected
  imports: [
    CommonModule,
    ButtonModule, // for <p-button>
    TableModule, // for <p-table>
    PaginatorModule, // for pagination
  ],
})
export class PatientSelectorComponent implements OnInit {
  patients: PatientDTO[] = [];
  selectedPatient: PatientDTO | null = null;

  router = inject(Router);
  authService = inject(AuthService);
  patientClient = inject(PatientClient);
  // Paging
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
        },
        error: (err) => {
          console.error('Error loading patients', err);
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
}
