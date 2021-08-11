import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAtencionComponent } from './registro-atencion.component';

describe('RegistroAtencionComponent', () => {
  let component: RegistroAtencionComponent;
  let fixture: ComponentFixture<RegistroAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
