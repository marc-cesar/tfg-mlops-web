import { Component } from '@angular/core';
import { GrantAdminAccessComponent } from '../grant-admin-access/grant-admin-access.component';
import { ForceRetrainComponent } from '../force-retrain/force-retrain.component';
import { RetrainSettingsComponent } from '../retrain-settings/retrain-settings.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    GrantAdminAccessComponent,
    ForceRetrainComponent,
    RetrainSettingsComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
