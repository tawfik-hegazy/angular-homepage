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
  imports: [ReactiveFormsModule],
})
export class EditCourseComponent implements OnInit {
  courseForm: FormGroup;
  courseId: string | null = null;
  selectedFile: File | null = null;
  imagePreview: string | undefined;
  currentCourse?: Course;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      teacherName: ['', Validators.required],
      courseName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [null],
    });
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.loadCourse(this.courseId);
    }
  }

  loadCourse(id: string): void {
    this.coursesService.getCourseByid(id).subscribe({
      next: (course: Course) => {
        this.currentCourse = course;
        this.courseForm.patchValue({
          teacherName: course.teacherName,
          courseName: course.courseName,
          price: course.price,
        });

        if (course.image) {
          this.imagePreview = `http://localhost:5000/uploads/courses/${course.image}`;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to load course:', err);
        alert('Failed to load course data.');
        this.router.navigate(['/admin/subjects']);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  saveEditCourse(): void {
    if (!this.courseId || this.courseForm.invalid) return;

    const formData = new FormData();
    formData.append('teacherName', this.courseForm.get('teacherName')?.value);
    formData.append('courseName', this.courseForm.get('courseName')?.value);
    formData.append('price', this.courseForm.get('price')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.coursesService.updateCourse(this.courseId, formData).subscribe({
      next: (updatedCourse) => {
        alert('Course updated successfully!');
        this.loadCourse(this.courseId!); // reload updated data
      },
      error: (err) => {
        console.error('Failed to update course:', err);
        alert('Failed to update course.');
      },
    });
  }

  cancelEdit(): void {
    this.router.navigate(['/admin/subjects']);
  }
}
