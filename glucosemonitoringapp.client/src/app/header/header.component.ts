import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/authentication/auth.service';
import { filter } from 'rxjs';
import { UserDTO } from '../../services/httpClient/httpClient';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false; // Initial state: logged out
  menuItems: MenuItem[] = [];
  user: UserDTO | undefined = undefined;
  /**
   *
   */
  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateMenuItems();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateLogginState();
      });

    // Simulate checking session state (e.g., from a service)
    // this.isLoggedIn = someAuthService.checkAuthStatus();
  }
  updateLogginState() {
    let user = this.authservice.CurretUser;
    if (user != undefined) {
      this.isLoggedIn = true;
      this.user = user;
    } else {
      this.isLoggedIn = false;
    }
    console.log(user);
  }
  updateMenuItems() {
    this.menuItems = [
      {
        label: 'Páciensek', // 'Patients' in Hungarian
        icon: 'pi pi-users',
        routerLink: '/patient-selector',
        // Optional: Only show if logged in
        // visible: this.isLoggedIn
      },
    ];
  }

  // Dummy login/logout function
  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
    this.authservice.logout();
  }
}
