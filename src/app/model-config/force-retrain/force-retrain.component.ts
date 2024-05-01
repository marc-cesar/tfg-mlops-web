import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-force-retrain',
  standalone: true,
  imports: [],
  templateUrl: './force-retrain.component.html',
  styleUrl: './force-retrain.component.css'
})
export class ForceRetrainComponent {
  message = '';
  isError = false;
  isLoading = false;

  constructor(private adminService: AdminService) {}

  onRetrainNow(){
    this.isLoading = true;
    const user = JSON.parse(localStorage.getItem('currentUser') as string)
    this.adminService.forceRetrainment(user.token as string)
      .then((response) => {
        this.isLoading = false;
        this.message = response.message;
        this.isError = false;
      })
      .catch((error) => {
        this.isLoading = false;
        this.message = (error as Error).message;
        this.isError = true;
      });
  }

}
