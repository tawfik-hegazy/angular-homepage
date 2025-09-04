import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCourseComponent} from './delete-course';

describe('DeleteCourse', () => {
  let component: DeleteCourseComponent;
  let fixture: ComponentFixture<DeleteCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
