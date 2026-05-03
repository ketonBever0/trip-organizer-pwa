import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllComponent } from './all.component';

describe('AllComponent', () => {
  let component: AllComponent;
  let fixture: ComponentFixture<AllComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AllComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
