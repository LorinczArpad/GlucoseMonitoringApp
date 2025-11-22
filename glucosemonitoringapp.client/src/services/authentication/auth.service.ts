import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';
import {
  AuthenticationClient,
  LoginResponse,
  UserDTO,
} from '../httpClient/httpClient';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authClient: AuthenticationClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.authClient.login(username, password);
  }
  authRole(token: string) {
    return this.authClient.authRole(token);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    }
  }

  public get token(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      let token = localStorage.getItem('token');
      let res = LoginResponse.fromJS(JSON.parse(token ?? ''));
      return res.token;
    } else {
      return null;
    }
  }

  public get isLoggedIn(): boolean {
    return this.token !== null;
  }
  public get CurretUser(): UserDTO | undefined {
    let token = localStorage.getItem('token');

    let res = LoginResponse.fromJS(JSON.parse(token ?? ''));

    return res.user;
  }
}
