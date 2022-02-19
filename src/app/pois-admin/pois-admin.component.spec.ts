import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoisAdminComponent } from './pois-admin.component';

describe('PoisAdminComponent', () => {
  let component: PoisAdminComponent;
  let fixture: ComponentFixture<PoisAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoisAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoisAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
