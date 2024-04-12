import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from '../request';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private apiUrl = environment.baseUrl

  constructor(private http: HttpClient) { }
  
  async getAllRequests(): Promise<Request[]> {
    const data = await fetch(this.apiUrl + "/requests/all")
    return await data.json() ?? [];
  }

  async getRequestsByToken(token : string): Promise<Request[]> {
    const data = await fetch(this.apiUrl + "/requests/all?token=" + token)
    return await data.json() ?? [];
  }

  async askForPrediction(object: any): Promise<any> {
    const data = await fetch(this.apiUrl + "/api/predict", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object)
    });
    return await data.json();
  }

  async sendFeedback(requestId: string, feedback: boolean): Promise<any> {
    const response = await fetch(`${this.apiUrl}/api/giveFeedback?id=${requestId}&isCorrect=${feedback == true ? '1' : '0'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return '';
  }

  getRequestById(id: string): Observable<Request> {
    return this.http.get(`${this.apiUrl}/requests/find/${id}`).pipe(
      map((response: any) => response as Request),
      catchError(error => {
        // Handle errors appropriately
        console.error('Error fetching request:', error);
        return throwError(() => new Error('Error fetching request'));
      })
    );
  }


}
