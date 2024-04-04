import { Component, inject } from '@angular/core';
import { RequestsTableComponent } from '../requests-table/requests-table.component';
import { RequestsService } from '../requests.service';
import { Request } from '../request';

@Component({
  selector: 'app-requests-list',
  standalone: true,
  imports: [
    RequestsTableComponent
  ],
  templateUrl: './requests-list.component.html',
  styleUrl: './requests-list.component.css'
})
export class RequestsListComponent {
  requestsService = inject(RequestsService);
  requests = new Promise<Request[]>(() => {});
  constructor(){
    this.requests = this.requestsService.getAllRequests();
  }
}
