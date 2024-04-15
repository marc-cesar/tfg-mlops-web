import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-retrain-settings',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './retrain-settings.component.html',
  styleUrl: './retrain-settings.component.css'
})
export class RetrainSettingsComponent {
  isLoading = false;
  isError = false;
  message = '';
  faInfo = faInfoCircle;
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

  validateNumberInput(event: any){
    const input = event.target;
    let value = input.value;
    
    // Replace non-numeric characters except decimal point, minus sign, and 'e' (exponential)
    value = value.replace(/[^0-9e.-]/gi, '');
    
    // Remove extra characters that shouldn't be at the start or in multiple occurrences
    value = value.replace(/^-|e|-/gi, function (match : any, offset : any) {
      // Allow '-' or 'e' only at the start, and '-' can appear after 'e'
      return (match === '-' && offset === 0) || (match === 'e' && offset > 0 && value[offset - 1] !== 'e') ? match : '';
    });
    
    input.value = value;
  }
}
