import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { AboutComponent } from './about/about.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'NewRequest',
        component: NewRequestComponent,
        title: 'New Request'
    },
    {
        path: 'Requests',
        component: RequestsListComponent,
        title: 'Requests'
    },
    {
        path: 'About',
        component: AboutComponent,
        title: 'About'
    }
];

export default routeConfig;