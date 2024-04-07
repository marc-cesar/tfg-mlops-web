import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseUrl + '/user'

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.apiUrl + '/logIn', { Username: username, Password: password }, { responseType: 'text' as 'json' })
      .pipe(
        map(response => {
          if (response && response != '') {
            localStorage.setItem('currentUser', JSON.stringify({ username: username, token: response.token }));
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  signup(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.apiUrl + '/signIn', { Username: username, Password: password }, { responseType: 'text' as 'json' })
      .pipe(
        map(response => {
          if (response && response != '') {
            localStorage.setItem('currentUser', JSON.stringify({ username: username, token: response.token }));
            return true;
          } else {
            return false;
          }
        })
      );
  }
}