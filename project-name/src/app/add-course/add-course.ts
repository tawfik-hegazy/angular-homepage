import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupName,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CoursesService } from '../services/courses-service';
import { Router, ActivatedRoute } from '@angular/router';
import { canComponentDeactivate } from '../models/can-component-deactivate';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css',
})
export class AddCourse implements OnInit, canComponentDeactivate {
  hasUnsavedChanges = true;
  courseId: string | null;

  courseForm!: FormGroup; // courseForm ! (!: means will be initialized later)
  courseService = inject(CoursesService);
  course!: import('c:/Users/Dell/OneDrive/Documents/nti/angular-homepage/project-name/src/app/models/course.model').Course;

  ngOnInit(): void {
    //form controls
    //connecting the inputs with the value
    this.courseForm = new FormGroup({
      courseName: new FormControl(null, Validators.required),
      teacherName: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      image: new FormControl(null, [
        Validators.required,
        Validators.pattern(/([^\\s]+(\.(jpg|png|gif|jpeg|webp))$)/i),
      ]),
    });
    this.courseService.getCourseByid(this.courseId).subscribe({
      next: (data) => {
        this.course = data;
      },
    });
  }

  selectedFile: File | null = null;
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onsubmit() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched;
      return;
    }
    const formData = new FormData();
    [];
    // arrange the data to send it to the back
    Object.keys(this.courseForm.value).forEach((key) => {
      //converting data to array by looping with forEach
      if (key !== 'image') {
        formData.append(key, this.courseForm.value[key]);
      }
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.courseService.addCourse(formData).subscribe({
      next: (course) => {
        console.log('course is added', course);
        this.courseForm.reset();
        this.selectedFile = null;
      },
      error: (err) => {
        console.log('Error:', err);
      },
    });
  }

  //update course

  setCourse() {
    this.courseForm.setValue({
      teacherName: 'Mr.Sameh Nashaat',
      courseName: 'Geology',
      price: 90,
      image: 'sameh.jpg',
    });
  }

  constructor() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
  }
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  gotoAddCourse() {
    this.router.navigate(['addCourse']);
  }
  gotoDeletecourse(id: string | undefined) {
    this.router.navigate(['deleteCourse', id]);
  }

  gotoSubjects() {
    this.router.navigate(['admin/subjects']);
  }
}
