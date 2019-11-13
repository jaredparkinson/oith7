import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OithHeaderComponent } from './oith-header.component';

describe('OithHeaderComponent', () => {
  let component: OithHeaderComponent;
  let fixture: ComponentFixture<OithHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OithHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OithHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
