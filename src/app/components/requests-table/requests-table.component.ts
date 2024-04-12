import { Component, inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from '../../models/request.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-requests-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
  }
}
