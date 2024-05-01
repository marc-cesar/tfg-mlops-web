import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelConfigPageComponent } from './model-config-page.component';

describe('ModelConfigPageComponent', () => {
  let component: ModelConfigPageComponent;
  let fixture: ComponentFixture<ModelConfigPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelConfigPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelConfigPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
