import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';	
import routeConfig from '../app.routes';
import { FormsModule } from '@angular/forms';	
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule, routeConfig, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  model: any = {};

  constructor(private authService: AuthService, private router : Router) {}

  onSubmit() {
    if (this.model.password !== this.model.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    this.authService.signup(this.model.username, this.model.password)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['']);
          // Navigate to the dashboard or home page
        } else {
          alert("Signup failed");
        }
      });

      // If theres no auth_token, print not logged in
      /*if (!localStorage.getItem('auth_token')) {
        console.log('Not logged in');
      }*/
  }
}
