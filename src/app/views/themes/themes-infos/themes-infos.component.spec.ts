import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesInfosComponent } from './themes-infos.component';

describe('ThemesInfosComponent', () => {
  let component: ThemesInfosComponent;
  let fixture: ComponentFixture<ThemesInfosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemesInfosComponent]
    });
    fixture = TestBed.createComponent(ThemesInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
