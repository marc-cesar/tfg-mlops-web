import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from './request';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private apiUrl = environment.baseUrl + '/api'

  constructor(private http: HttpClient) { }
  
  async getAllRequests(): Promise<Request[]> {
    const data = await fetch(this.apiUrl + "/requests/all")
    return await data.json() ?? [];
  }

  async askForPrediction(object: any): Promise<any> {
    const data = await fetch(this.apiUrl + "/predict", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object)
    });
    return await data.json();
  }

  async sendFeedback(requestId: string, feedback: boolean): Promise<any> {
    const response = await fetch(`${this.apiUrl}/giveFeedback?id=${requestId}&isCorrect=${feedback == true ? '1' : '0'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return '';
  }


}
