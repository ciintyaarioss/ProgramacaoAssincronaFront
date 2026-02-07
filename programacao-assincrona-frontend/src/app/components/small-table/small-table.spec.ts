import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallTable } from './small-table';

describe('SmallTable', () => {
  let component: SmallTable;
  let fixture: ComponentFixture<SmallTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
