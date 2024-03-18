import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSessionComponent } from './insert-session.component';

describe('InsertSessionComponent', () => {
  let component: InsertSessionComponent;
  let fixture: ComponentFixture<InsertSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertSessionComponent]
    });
    fixture = TestBed.createComponent(InsertSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
