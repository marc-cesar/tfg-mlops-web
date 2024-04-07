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
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, routeConfig, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  model: any = {};

  constructor(private authService: AuthService, private router : Router) {}

  onSubmit() {
    this.authService.login(this.model.username, this.model.password)
      .subscribe(success => {
        if (success) {
          console.log("Login successful");
          // Navigate to the home page
          this.router.navigate(['']);
        } else {
          alert("Login failed");
        }
      });
  }
}
