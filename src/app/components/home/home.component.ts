import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import routeConfig from '../../app.routes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, routeConfig],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // get the logged user from the local storage
  user = JSON.parse(localStorage.getItem('currentUser') as string);
  // if user is not null, set this.isAdmin to the user.isAdmin value
  isAdmin = this.user ? this.user.isAdmin : false;

}
