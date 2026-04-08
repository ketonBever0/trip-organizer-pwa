import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { MeTab } from './me.page';

describe('Tab3Page', () => {
  let component: MeTab;
  let fixture: ComponentFixture<MeTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeTab],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MeTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
