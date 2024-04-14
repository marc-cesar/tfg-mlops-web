import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-retrain-settings',
  standalone: true,
  imports: [],
  templateUrl: './retrain-settings.component.html',
  styleUrl: './retrain-settings.component.css'
})
export class RetrainSettingsComponent {
  isLoading = false;
  isError = false;
  message = '';
  constructor(private adminService : AdminService) {}

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings(){
    this.isLoading = true;
    const user = JSON.parse(localStorage.getItem('currentUser') as string)
    this.adminService.getRetrainmentParameters(user.token).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.config) {
          (document.getElementById('MinimumRequestsNumber') as HTMLInputElement).value = response.config.minimumRequests.toString();
          (document.getElementById('MinimumPercentageNeeded') as HTMLInputElement).value = response.config.successPercentage.toString();
          this.message = response.message;
          this.isError = false;
        } else if (response.error) {
          this.isError = true;
          this.message = response.error;
        }
      },
      error: (err) => {
        console.error('Error fetching retrain settings:', err);
        alert('Failed to fetch retrain settings');
      }
    });
  }

  saveParameters(){
    var minRequests = (document.getElementById('MinimumRequestsNumber') as HTMLInputElement).value.toString();
    var minPercentage = (document.getElementById('MinimumPercentageNeeded') as HTMLInputElement).value.toString();

    this.isLoading = true;
    const user = JSON.parse(localStorage.getItem('currentUser') as string)
    this.adminService.setRetrainmentParameters(user.token as string, minRequests, minPercentage)
      .then((response) => {
        this.isLoading = false;
        //this.loadSettings();
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
