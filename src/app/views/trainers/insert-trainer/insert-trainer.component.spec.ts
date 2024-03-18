import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTrainerComponent } from './insert-trainer.component';

describe('InsertTrainerComponent', () => {
  let component: InsertTrainerComponent;
  let fixture: ComponentFixture<InsertTrainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertTrainerComponent]
    });
    fixture = TestBed.createComponent(InsertTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
