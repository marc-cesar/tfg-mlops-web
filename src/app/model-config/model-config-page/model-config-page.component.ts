import { Component } from '@angular/core';
import { ForceRetrainComponent } from "../force-retrain/force-retrain.component";
import { RetrainSettingsComponent } from "../../components/admin/retrain-settings/retrain-settings.component";

@Component({
    selector: 'app-model-config-page',
    standalone: true,
    templateUrl: './model-config-page.component.html',
    styleUrl: './model-config-page.component.css',
    imports: [ForceRetrainComponent, RetrainSettingsComponent]
})
export class ModelConfigPageComponent {

}
