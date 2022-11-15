import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventScreenComponent } from './event-screen.component';

describe('EventScreenComponent', () => {
  let component: EventScreenComponent;
  let fixture: ComponentFixture<EventScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
