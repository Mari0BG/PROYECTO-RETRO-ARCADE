import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftComponent } from './left.component';

describe('LeftComponent', () => {
  let component: LeftComponent;
  let fixture: ComponentFixture<LeftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LeftComponent]
    });
    fixture = TestBed.createComponent(LeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
