import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbComponent } from './dashb.component';

describe('DashbComponent', () => {
  let component: DashbComponent;
  let fixture: ComponentFixture<DashbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbComponent]
    });
    fixture = TestBed.createComponent(DashbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
