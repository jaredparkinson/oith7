import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatGroupsComponent } from './format-groups.component';

describe('FormatGroupsComponent', () => {
  let component: FormatGroupsComponent;
  let fixture: ComponentFixture<FormatGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
