import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeClientPage } from './home-client.page';

describe('HomeClientPage', () => {
  let component: HomeClientPage;
  let fixture: ComponentFixture<HomeClientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeClientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
