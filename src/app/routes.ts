import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// Factory function to create a canActivate function with isAdmin check
function createCheckTokenAccess(isAdminRequired: boolean = false) {
    return (): boolean => {
        let hasAccess = false;
        const userStr = localStorage.getItem('currentUser');
        if (userStr != null) {
            const user = JSON.parse(userStr);
            // Check if token exists and, if isAdminRequired, also check if user isAdmin
            if (user.token && (!isAdminRequired || user.isAdmin)) {
                hasAccess = true;
            }
        }

        if (hasAccess) {
            return true;
        } else {
            window.location.href = '#/Login'; // Redirect for unauthorized access
            return false;
        }
    };
}
const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'NewRequest',
        component: NewRequestComponent,
        title: 'New Credit',
        canActivate: [createCheckTokenAccess(false)]
    },
    {
        path: 'Requests',
        component: RequestsListComponent,
        title: 'All Requests',
        canActivate: [createCheckTokenAccess(false)]
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