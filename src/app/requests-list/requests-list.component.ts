import { Component } from '@angular/core';
import { RequestsTableComponent } from '../requests-table/requests-table.component';

@Component({
  selector: 'app-requests-list',
  standalone: true,
  imports: [RequestsTableComponent],
  templateUrl: './requests-list.component.html',
  styleUrl: './requests-list.component.css'
})
export class RequestsListComponent {

}
