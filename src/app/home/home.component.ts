import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import routeConfig from '../app.routes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, routeConfig],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
