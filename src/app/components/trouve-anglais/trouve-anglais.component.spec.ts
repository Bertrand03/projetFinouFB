import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrouveAnglaisComponent } from './trouve-anglais.component';

describe('TrouveAnglaisComponent', () => {
  let component: TrouveAnglaisComponent;
  let fixture: ComponentFixture<TrouveAnglaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrouveAnglaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrouveAnglaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
