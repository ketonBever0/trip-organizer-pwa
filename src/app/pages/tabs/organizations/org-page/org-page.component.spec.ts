import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrgPageComponent } from './org-page.component';

describe('OrgPageComponent', () => {
  let component: OrgPageComponent;
  let fixture: ComponentFixture<OrgPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [OrgPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrgPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
