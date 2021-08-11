import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroReclamoComponent } from './registro-reclamo.component';

describe('RegistroReclamoComponent', () => {
  let component: RegistroReclamoComponent;
  let fixture: ComponentFixture<RegistroReclamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroReclamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroReclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
