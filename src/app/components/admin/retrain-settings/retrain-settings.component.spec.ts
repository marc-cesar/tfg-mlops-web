import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrainSettingsComponent } from './retrain-settings.component';

describe('RetrainSettingsComponent', () => {
  let component: RetrainSettingsComponent;
  let fixture: ComponentFixture<RetrainSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetrainSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetrainSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
