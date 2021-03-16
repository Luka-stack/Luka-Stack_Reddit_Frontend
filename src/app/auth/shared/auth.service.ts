import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpRequestPayload } from '../sign-up/sign-up-request.payload';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request.paypload';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:8080/api/auth';

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername()
  };

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequest: SignUpRequestPayload): Observable<any> {
    return this.httpClient.post(this.authUrl + '/signup', signupRequest, { responseType: 'text' });
  }

  login(loginRequest: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.authUrl + '/login', loginRequest)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        return true;
      }));
  }

  logout() {
    this.httpClient.post(this.authUrl +'/logout', this.refreshTokenPayload, { responseType: 'text' })
      .subscribe(() => {}, error => throwError(error));

      this.localStorage.clear('authenticationToken');
      this.localStorage.clear('username');
      this.localStorage.clear('refreshToken');
      this.localStorage.clear('expiresAt');
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>(this.authUrl + '/refreshToken', this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getUsername() {
    return this.localStorage.retrieve('username');
  }

  isLoggedIn() {
    return this.getJwtToken() != null;
  }

  private getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }
}
