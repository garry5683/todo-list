import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpriceComponent } from './addprice.component';

describe('AddpriceComponent', () => {
  let component: AddpriceComponent;
  let fixture: ComponentFixture<AddpriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddpriceComponent]
    });
    fixture = TestBed.createComponent(AddpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
