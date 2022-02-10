import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrouveFrancaisComponent } from './trouve-francais.component';

describe('TrouveFrancaisComponent', () => {
  let component: TrouveFrancaisComponent;
  let fixture: ComponentFixture<TrouveFrancaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrouveFrancaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrouveFrancaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
