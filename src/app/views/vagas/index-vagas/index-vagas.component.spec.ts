import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexVagasComponent } from './index-vagas.component';

describe('IndexVagasComponent', () => {
  let component: IndexVagasComponent;
  let fixture: ComponentFixture<IndexVagasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexVagasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
