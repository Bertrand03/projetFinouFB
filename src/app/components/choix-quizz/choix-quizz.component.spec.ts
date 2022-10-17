import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixQuizzComponent } from './choix-quizz.component';

describe('ChoixQuizzComponent', () => {
  let component: ChoixQuizzComponent;
  let fixture: ComponentFixture<ChoixQuizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixQuizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
