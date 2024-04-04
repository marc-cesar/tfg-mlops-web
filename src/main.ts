import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withHashLocation } from '@angular/router';
import routeConfig from './app/routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig, withHashLocation()),
    provideHttpClient()
  ]
})
  .catch((err) => console.error(err));
