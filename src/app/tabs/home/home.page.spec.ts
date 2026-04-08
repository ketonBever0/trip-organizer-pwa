import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { HomeTab } from './home.page';

describe('Tab1Page', () => {
  let component: HomeTab;
  let fixture: ComponentFixture<HomeTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeTab],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
