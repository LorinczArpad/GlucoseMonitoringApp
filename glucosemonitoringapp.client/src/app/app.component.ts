import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient,public router: Router) {}

  ngOnInit() {
    this.router.navigate(['login']);
  }

  title = 'glucosemonitoringapp.client';
}
