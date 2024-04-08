import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Log } from '../models/log.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private apiUrl = environment.baseUrl + '/logs'

  constructor(private http: HttpClient) { }

  getAllLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(this.apiUrl + "/all");
  }
}
