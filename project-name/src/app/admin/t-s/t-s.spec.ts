import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TSComponent } from './t-s';

describe('TS', () => {
  let component: TSComponent;
  let fixture: ComponentFixture<TSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
