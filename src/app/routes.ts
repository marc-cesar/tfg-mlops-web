import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { NewRequestComponent } from './components/new-request/new-request.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LogComponent } from './components/log/log.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { ModelConfigPageComponent } from './model-config/model-config-page/model-config-page.component';

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
        title: 'New Credit Assessment',
        canActivate: [createCheckTokenAccess(false)]
    },
    {
        path: 'Requests',
        component: RequestsListComponent,
        title: 'All Credit Assessments',
        canActivate: [createCheckTokenAccess(false)]
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
    },
    {
        path: 'Logs',
        component: LogComponent,
        title: 'Logs'
    },
    {
        path: 'ModelConfig',
        component: ModelConfigPageComponent,
        title: 'Model Configuration'
    },
    {
        path: 'Admin',
        component: AdminPageComponent,
        title: 'Admin',
    },
    {
        path: 'About',
        component: AboutComponent,
        title: 'About'
    }
];

export default routeConfig;