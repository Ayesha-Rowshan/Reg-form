import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationappComponent } from './registrationapp.component';

describe('RegistrationappComponent', () => {
  let component: RegistrationappComponent;
  let fixture: ComponentFixture<RegistrationappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationappComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
