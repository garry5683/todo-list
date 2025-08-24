import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterSearchComponent } from './voter-search.component';

describe('VoterSearchComponent', () => {
  let component: VoterSearchComponent;
  let fixture: ComponentFixture<VoterSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoterSearchComponent]
    });
    fixture = TestBed.createComponent(VoterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
