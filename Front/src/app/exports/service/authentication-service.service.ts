import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceService {
  private token?: string ;

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token ? this.token : localStorage.getItem('token');
  }
}
