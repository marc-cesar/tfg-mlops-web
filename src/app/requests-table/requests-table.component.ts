import { Component, inject } from '@angular/core';
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
  requests: Request[] = [];
  // http = inject(HttpClient);

  ngOnInit() {
    // this.http.get<Request[]>('http://localhost:8080/requests/all')
    // .subscribe((data) => {
    //   this.requests = data;
    // });
  }
}
