import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaSuccess } from './matricula-success';

describe('MatriculaSuccess', () => {
  let component: MatriculaSuccess;
  let fixture: ComponentFixture<MatriculaSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatriculaSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriculaSuccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
