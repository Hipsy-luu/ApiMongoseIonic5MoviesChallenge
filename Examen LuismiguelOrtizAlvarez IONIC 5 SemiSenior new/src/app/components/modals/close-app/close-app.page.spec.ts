import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CloseAppPage } from './close-app.page';

describe('CloseAppPage', () => {
  let component: CloseAppPage;
  let fixture: ComponentFixture<CloseAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseAppPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CloseAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
