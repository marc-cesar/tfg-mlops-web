import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterWebComponent } from './footer-web/footer-web.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import routeConfig from './routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    FooterWebComponent,
    HomeComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tfg-mlops-web';

  menuItems = routeConfig;
}
