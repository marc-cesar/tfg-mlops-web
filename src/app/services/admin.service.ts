import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private apiUrl = environment.baseUrl

  constructor(private http : HttpClient) { }

  forceRetrainment(token : string): Promise<any> {
    return this.http.post(`${this.apiUrl}/admin/forceRetraining?token=${token}`, {}).toPromise();
  }
}
