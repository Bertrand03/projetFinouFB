import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixActionComponent } from './choix-action.component';

describe('ChoixActionComponent', () => {
  let component: ChoixActionComponent;
  let fixture: ComponentFixture<ChoixActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
