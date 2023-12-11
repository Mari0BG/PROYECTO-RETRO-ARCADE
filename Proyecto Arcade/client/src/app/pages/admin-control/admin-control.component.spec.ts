import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminControlComponent } from './admin-control.component';

describe('AdminControlComponent', () => {
  let component: AdminControlComponent;
  let fixture: ComponentFixture<AdminControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdminControlComponent]
    });
    fixture = TestBed.createComponent(AdminControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
