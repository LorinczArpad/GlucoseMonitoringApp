import { Component } from '@angular/core';
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
  standalone: false,
  templateUrl: './patient-selector.component.html',
  styleUrl: './patient-selector.component.css',
})
export class PatientSelectorComponent {
  patients: Patient[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', mothersName: 'Jane Doe', birthDate: new Date(2005, 4, 12), insulinPump: 'Tandem', cgmSensor: 'Dexcom G6' },
    { id: 2, firstName: 'Anna', lastName: 'Smith', mothersName: 'Mary Smith', birthDate: new Date(2010, 1, 23), insulinPump: 'Omnipod', cgmSensor: 'Freestyle Libre' },
    { id: 3, firstName: 'Peter', lastName: 'Brown', mothersName: 'Susan Brown', birthDate: new Date(2008, 6, 5), insulinPump: 'Medtronic', cgmSensor: 'Guardian Sensor' }
    // Add more mock patients here
  ];
  
  selectedPatient: Patient | null = null;
}
