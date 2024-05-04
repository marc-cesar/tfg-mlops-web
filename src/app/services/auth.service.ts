import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseUrl + '/user'

  constructor(private http: HttpClient, private storageService : StorageService, private router : Router) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.apiUrl + '/logIn', { Username: username, Password: password })
      .pipe(
        map(response => {
          if (response && response != '' && response.Token != '' && response.Token != null && response.username != '') {
            this.storageService.currentUser = {
              id: "",
              username: username, 
              token: response.Token,
              isAdmin: response.IsAdmin
            };
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }

  signup(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.apiUrl + '/signIn', { Username: username, Password: password })
      .pipe(
        map(response => {
          if (response && response != '' && response.Token != '' && response.username != '') {
            this.storageService.currentUser = {
              id: "",
              username: username, 
              token: response.Token,
              isAdmin: response.IsAdmin
            };
            return true;
          } else {
            return false;
          }
        })
      );
  }

  isAdmin(): boolean {
    const user = this.storageService.currentUserValue;
    return user?.isAdmin ?? false;
  }

  isLoggedIn(): boolean {
    return !!this.storageService.currentUserValue;
  }
}