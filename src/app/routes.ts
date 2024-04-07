import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'NewRequest',
        component: NewRequestComponent,
        title: 'New Credit'
    },
    {
        path: 'Requests',
        component: RequestsListComponent,
        title: 'All Requests'
    },
    {
        path: 'About',
        component: AboutComponent,
        title: 'About'
    },
    {
        path: 'Login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'Signup',
        component: SignupComponent,
        title: 'Signup'
    }
];

export default routeConfig;