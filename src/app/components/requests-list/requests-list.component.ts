import { Component, inject } from '@angular/core';
import { RequestsTableComponent } from '../requests-table/requests-table.component';
import { RequestsService } from '../../services/requests.service';
import { Request } from '../../models/request.model';

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
    const user = JSON.parse(localStorage.getItem('currentUser') as string)
    //this.requests = user.isAdmin ? this.requestsService.getAllRequests() : this.requestsService.getRequestsByToken(user.token);
    this.requests = this.requestsService.getRequestsByToken(user.token);
  }
}
