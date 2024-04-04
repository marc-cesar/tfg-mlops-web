import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from './request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private apiUrl = 'https://tfg-mlops-service-01cc2090b7ec.herokuapp.com/api'

  constructor(private http: HttpClient) { }
  
  async getAllRequests(): Promise<Request[]> {
    const data = await fetch(this.apiUrl + "/getAllRequests")
    return await data.json() ?? [];
  }

}
