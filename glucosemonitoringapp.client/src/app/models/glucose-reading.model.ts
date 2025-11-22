export interface GlucoseReading {
  time: string;
  value: number;
}

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  phoneNumber: string;
}
