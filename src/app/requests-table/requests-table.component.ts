import { Component, inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from '../models/request.model';

@Component({
  selector: 'app-requests-table',
  standalone: true,
  imports: [],
  templateUrl: './requests-table.component.html',
  styleUrl: './requests-table.component.css'
})
export class RequestsTableComponent {
  @Input()
  requestsPromise: Promise<Request[]> = new Promise<Request[]>(() => {});
  requests: Request[] = [];

  async processRequests() {
    this.requests = await this.requestsPromise;
  }

  ngOnInit() {
    this.processRequests();
    // this.http.get<Request[]>('http://localhost:8080/requests/all')
    // .subscribe((data) => {
    //   this.requests = data;
    // });
  }
}
