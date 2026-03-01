import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSubjects } from './chart-subjects';

describe('ChartSubjects', () => {
  let component: ChartSubjects;
  let fixture: ComponentFixture<ChartSubjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartSubjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSubjects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
