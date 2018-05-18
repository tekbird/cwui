import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionSaveComponent } from './connection-save.component';

describe('ConnectionSaveComponent', () => {
  let component: ConnectionSaveComponent;
  let fixture: ComponentFixture<ConnectionSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
