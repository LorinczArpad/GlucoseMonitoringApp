import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';
import { AuthenticationClient } from '../httpClient/httpClient';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authClient: AuthenticationClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.authClient.login(username, password);
  }
  authRole(token: string) {
    return this.authClient.authRole(token);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    }
  }

  public get token(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  public get isLoggedIn(): boolean {
    return this.token !== null;
  }
}