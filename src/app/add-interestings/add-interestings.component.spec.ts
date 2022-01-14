import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterestingsComponent } from './add-interestings.component';

describe('AddInterestingsComponent', () => {
  let component: AddInterestingsComponent;
  let fixture: ComponentFixture<AddInterestingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInterestingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterestingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
