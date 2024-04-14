import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { AdminService } from '../../../services/admin.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-grant-admin-access',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './grant-admin-access.component.html',
  styleUrl: './grant-admin-access.component.css'
})
export class GrantAdminAccessComponent {
  // Adminusers is a list of user
  adminUsers: any[] = [];
  isLoading = false;

  constructor(private adminService : AdminService) {
  }

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    const user = JSON.parse(localStorage.getItem('currentUser') as string)
    this.adminService.getAllAdmins(user.token).subscribe({
      next: (response) => {
        if (response.users) {
          this.adminUsers = response.users;
        } else if (response.error) {
          console.error(response.error);
          alert('Error: ' + response.error);  // Display or handle the error message as needed
        }
      },
      error: (err) => {
        console.error('Error fetching admins:', err);
        alert('Failed to fetch admin data');
      }
    });
  }

  removeAdmin(username : string) {
    this.isLoading = true;
    const user = JSON.parse(localStorage.getItem('currentUser') as string)
    this.adminService.removeAdmin(username, user.token as string)
      .then((response) => {
        this.isLoading = false;
        if (response.users) {
          this.loadAdmins();
        } else if (response.error) {
          console.error(response.error);
          alert('Error: ' + response.error);  // Display or handle the error message as needed
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  addAdmin(username : string){
    this.isLoading = true;
    const user = JSON.parse(localStorage.getItem('currentUser') as string)
    this.adminService.addAdmin(username, user.token as string)
      .then((response) => {
        this.isLoading = false;
        // UsernameInput value clear
        (document.getElementById('usernameInput') as HTMLInputElement).value = '';
        if (response.users) {
          this.loadAdmins();
        } else if (response.error) {
          console.error(response.error);
          alert('Error: ' + response.error);  // Display or handle the error message as needed
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }
}
