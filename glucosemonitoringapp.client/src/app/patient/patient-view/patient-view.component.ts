import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  DatePipe,
  CommonModule, // Used for NgIf, NgFor, NgClass directives
} from '@angular/common';
import { Patient, GlucoseReading } from '../../models/glucose-reading.model';
import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  ChartType,
  // --- CHART.JS REGISTRATION IMPORTS ADDED HERE ---
  LineController, // <--- ADDED LINE CONTROLLER
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

@Component({
  standalone: true,
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css'],
  imports: [
    CommonModule,
    DatePipe, // Pipes must be imported for standalone components
  ],
  // DatePipe is also needed in providers for it to be injectable in the constructor
  providers: [DatePipe],
})
export class PatientViewComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('glucoseChart') chartCanvas!: ElementRef<HTMLCanvasElement>;

  // --- Patient Data ---
  public patient: Patient = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    birthDate: new Date('1990-05-20'),
    email: 'john.doe@example.com',
    phoneNumber: '555-1234',
  };

  // --- Monitoring State & Data ---
  public isMonitoring: boolean = false;
  public latestReading: number | null = null;
  public latestTime: string | null = null;
  private dataInterval: any;
  private chartInstance!: Chart;
  private readings: GlucoseReading[] = [];
  private readonly maxReadings = 20; // Limit for the rolling graph window

  // --- Chart Configuration ---
  private chartConfig: ChartConfiguration = {
    type: 'line' as ChartType,
    data: {
      labels: [],
      datasets: [
        {
          label: 'Blood Glucose (mg/dL)',
          data: [],
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 50,
          max: 300,
          title: {
            display: true,
            text: 'Glucose (mg/dL)',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Time',
          },
        },
      },
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Real-Time Blood Glucose',
        },
      },
    },
  };

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  private initializeChart(): void {
    Chart.register(
      LineController,
      LinearScale,
      CategoryScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chartInstance = new Chart(ctx, this.chartConfig);
    }
  }

  /**
   * Starts the fake real-time data generation (simulating a WebSocket connection).
   */
  public startMonitoring(): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.readings = [];
    this.updateChartData();
    console.log('Starting fake glucose data generation.');

    this.dataInterval = setInterval(() => {
      this.generateFakeReading();
    }, 2000); // New reading every 2 seconds
  }

  public stopMonitoring(): void {
    if (!this.isMonitoring) return;

    this.isMonitoring = false;
    clearInterval(this.dataInterval);
    console.log('Stopped glucose data generation.');
  }

  private generateFakeReading(): void {
    const randomGlucose = Math.floor(Math.random() * (250 - 80 + 1)) + 80;
    const currentTime = this.datePipe.transform(new Date(), 'HH:mm:ss')!;

    const newReading: GlucoseReading = {
      time: currentTime,
      value: randomGlucose,
    };

    this.readings.push(newReading);

    this.latestReading = randomGlucose;
    this.latestTime = currentTime;

    if (this.readings.length > this.maxReadings) {
      this.readings.shift();
    }

    this.updateChartData();
  }

  private updateChartData(): void {
    if (!this.chartInstance) return;

    this.chartInstance.data.labels = this.readings.map((r) => r.time);

    (this.chartInstance.data.datasets[0].data as number[]) = this.readings.map(
      (r) => r.value
    );

    this.chartInstance.update('none');
  }

  ngOnDestroy(): void {
    this.stopMonitoring();
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
}
