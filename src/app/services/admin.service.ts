import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private apiUrl = environment.baseUrl

  constructor(private http : HttpClient) { }

  forceRetrainment(token : string): Promise<any> {
    return this.http.post(`${this.apiUrl}/admin/forceRetraining?token=${token}`, {}).toPromise();
  }

  getAllAdmins(token : string): Observable<any> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/getAllAdmins?token=${token}`);
  }

  addAdmin(username : string, token : string): Promise<any> {
    return this.http.post(`${this.apiUrl}/admin/setUserAdmin?token=${token}&username=${username}`,'').toPromise();
  }

  removeAdmin(username : string, token : string): Promise<any> {
    return this.http.post(`${this.apiUrl}/admin/unsetUserAdmin?token=${token}&username=${username}`,'').toPromise();
  }
}
