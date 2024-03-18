import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTrainingComponent } from './insert-training.component';

describe('InsertTrainingComponent', () => {
  let component: InsertTrainingComponent;
  let fixture: ComponentFixture<InsertTrainingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertTrainingComponent]
    });
    fixture = TestBed.createComponent(InsertTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
