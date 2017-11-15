import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLoanCalcComponent } from './home-loan-calc.component';

describe('HomeLoanCalcComponent', () => {
  let component: HomeLoanCalcComponent;
  let fixture: ComponentFixture<HomeLoanCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLoanCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLoanCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
