import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterWebComponent } from './components/footer-web/footer-web.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import routeConfig from './routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterWebComponent,
    HomeComponent,
    RouterModule,
    NavBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tfg-mlops-web';

  menuItems = routeConfig;
}
