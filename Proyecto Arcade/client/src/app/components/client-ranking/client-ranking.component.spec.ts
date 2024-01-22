import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRankingComponent } from './client-ranking.component';

describe('ClientRankingComponent', () => {
  let component: ClientRankingComponent;
  let fixture: ComponentFixture<ClientRankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientRankingComponent]
    });
    fixture = TestBed.createComponent(ClientRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
