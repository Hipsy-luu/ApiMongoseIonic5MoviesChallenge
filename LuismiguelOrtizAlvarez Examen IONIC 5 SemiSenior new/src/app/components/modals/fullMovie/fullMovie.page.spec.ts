import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FullMoviePage } from './fullMovie.page';

describe('FullMoviePage', () => {
  let component: FullMoviePage;
  let fixture: ComponentFixture<FullMoviePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullMoviePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FullMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
