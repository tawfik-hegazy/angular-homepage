import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMain } from './main';

describe('CMain', () => {
  let component: CMain;
  let fixture: ComponentFixture<CMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
