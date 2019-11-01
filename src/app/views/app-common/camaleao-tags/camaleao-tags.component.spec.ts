import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamaleaoTagsComponent } from './camaleao-tags.component';

describe('CamaleaoTagsComponent', () => {
  let component: CamaleaoTagsComponent;
  let fixture: ComponentFixture<CamaleaoTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamaleaoTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamaleaoTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
