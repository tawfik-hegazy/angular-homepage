import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../services/courses-service';
import { Course } from '../models/course.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.html',
  styleUrls: ['./edit-course.css'],
  imports: [ReactiveFormsModule]
})
export class EditCourseComponent implements OnInit {
  courseForm: FormGroup;
  courseId: string | null = null;
  selectedFile: File | null = null;
  currentCourse?: Course;
  imagePreview: string|undefined;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      teacherName: ['', Validators.required],
      courseName: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ["", [Validators.required, Validators.min(0)]],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.loadCourse(this.courseId);
    }
  }

loadCourse(id: string): void {
  this.coursesService.getCourseByid(id).subscribe(
    (course: Course | null) => {
      if (!course) {
        alert('Course not found!');
        this.router.navigate(['/admin/subjects']);
        return;
      }

      this.currentCourse = course;

      this.courseForm.patchValue({
        teacherName: course.teacherName || '',
        courseName: course.courseName || '',
        price: course.price || 0
      });

      // Show current image if exists
      // if (course.image) {
      //   this.imagePreview = `http://localhost:5000/uploads/courses/${course.image}`;
      // }
    },
    (err: HttpErrorResponse) => {
      console.error('Failed to load course:', err);
      alert('Failed to load course data.');
    }
  );
}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (!this.courseId || this.courseForm.invalid) return;

    const formData = new FormData();
    formData.append('teacherName', this.courseForm.get('teacherName')?.value);
    formData.append('courseName', this.courseForm.get('courseName')?.value);
    formData.append('title', this.courseForm.get('title')?.value);
    formData.append('description', this.courseForm.get('description')?.value);
    formData.append('price', this.courseForm.get('price')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.coursesService.updateCourse(this.courseId, formData).subscribe(
      () => {
        alert('Course updated successfully!');
        this.router.navigate(['/admin/subjects']);
      },
      (err: HttpErrorResponse) => {
        console.error('Failed to update course:', err);
        alert('Failed to update course.');
      }
    );
  }
}
