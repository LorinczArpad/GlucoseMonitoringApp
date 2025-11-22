import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-view',
  standalone: true,
  templateUrl: './patient-view.component.html',
  styleUrl: './patient-view.component.css',
})
export class PatientViewComponent implements OnInit {
  route = inject(ActivatedRoute);
  patientId!: number;

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Patient ID:', this.patientId);
   
  }
}
