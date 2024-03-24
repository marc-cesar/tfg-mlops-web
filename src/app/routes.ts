import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RequestsListComponent } from './requests-list/requests-list.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'MLOps - Home Page'
    },
    {
        path: 'Requests',
        component: RequestsListComponent,
        title: 'MLOps Banking System - Requests'
    },
    {
        path: 'services',
        component: HomeComponent,
        title: 'Services Page'
    }
];

export default routeConfig;