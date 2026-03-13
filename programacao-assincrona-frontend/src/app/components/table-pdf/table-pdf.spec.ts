import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePdf } from './table-pdf';

describe('TablePdf', () => {
  let component: TablePdf;
  let fixture: ComponentFixture<TablePdf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablePdf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePdf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
