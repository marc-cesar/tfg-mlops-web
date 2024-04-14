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

    /*const response = await fetch(this.apiUrl + "/api/forceRetrainment?token=" + token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok){
      throw new Error(data.message || 'An error occurred while retraining the model');
    }
    return data;*/
  }
}
