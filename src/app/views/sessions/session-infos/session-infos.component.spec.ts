import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionInfosComponent } from './session-infos.component';

describe('SessionInfosComponent', () => {
  let component: SessionInfosComponent;
  let fixture: ComponentFixture<SessionInfosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionInfosComponent]
    });
    fixture = TestBed.createComponent(SessionInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
