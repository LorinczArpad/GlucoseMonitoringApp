import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ButtonModule, 
    MenubarModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false; // Initial state: logged out
  menuItems: MenuItem[] = [];
/**
 *
 */
constructor(private authservice:AuthService) {
  

}
  ngOnInit() {
    this.updateMenuItems();
    // Simulate checking session state (e.g., from a service)
    // this.isLoggedIn = someAuthService.checkAuthStatus();
  }

  updateMenuItems() {
    this.menuItems = [
      {
        label: 'Páciensek', // 'Patients' in Hungarian
        icon: 'pi pi-users',
        routerLink: '/patient-selector',
        // Optional: Only show if logged in
        // visible: this.isLoggedIn 
      }
    ];
  }

  // Dummy login/logout function
  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
    console.log(this.isLoggedIn ? 'User logged in.' : 'User logged out.');
  }
}