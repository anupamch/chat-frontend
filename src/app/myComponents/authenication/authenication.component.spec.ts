import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenicationComponent } from './authenication.component';

describe('AuthenicationComponent', () => {
  let component: AuthenicationComponent;
  let fixture: ComponentFixture<AuthenicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
