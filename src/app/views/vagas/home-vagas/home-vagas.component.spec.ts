import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVagasComponent } from './home-vagas.component';

describe('HomeVagasComponent', () => {
  let component: HomeVagasComponent;
  let fixture: ComponentFixture<HomeVagasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeVagasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
