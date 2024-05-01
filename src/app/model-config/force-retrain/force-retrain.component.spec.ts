import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceRetrainComponent } from './force-retrain.component';

describe('ForceRetrainComponent', () => {
  let component: ForceRetrainComponent;
  let fixture: ComponentFixture<ForceRetrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForceRetrainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForceRetrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
