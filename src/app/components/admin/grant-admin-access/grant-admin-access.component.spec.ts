import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantAdminAccessComponent } from './grant-admin-access.component';

describe('GrantAdminAccessComponent', () => {
  let component: GrantAdminAccessComponent;
  let fixture: ComponentFixture<GrantAdminAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrantAdminAccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrantAdminAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
