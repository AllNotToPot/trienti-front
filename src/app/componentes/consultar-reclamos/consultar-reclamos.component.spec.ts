import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarReclamosComponent } from './consultar-reclamos.component';

describe('ConsultarReclamosComponent', () => {
  let component: ConsultarReclamosComponent;
  let fixture: ComponentFixture<ConsultarReclamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarReclamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarReclamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
