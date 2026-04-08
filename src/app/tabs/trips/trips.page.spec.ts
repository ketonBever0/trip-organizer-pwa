import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { TripsTab } from './trips.page';

describe('Tab2Page', () => {
  let component: TripsTab;
  let fixture: ComponentFixture<TripsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripsTab],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TripsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
