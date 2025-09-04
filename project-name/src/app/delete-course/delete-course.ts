import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../services/courses-service';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.html',
  styleUrls: ['./delete-course.css']
})
export class DeleteCourseComponent implements OnInit {
  private courseService = inject(CoursesService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  message = signal<string | null>(null);   
  status = signal<'success' | 'error' | 'loading' | null>(null); 

  ngOnInit(): void {
    const courseId = this.activatedRoute.snapshot.paramMap.get('id');

    if (courseId) {
      const confirmDelete = confirm('Are you sure you want to delete this course?');

      if (confirmDelete) {
        this.status.set('loading');
        this.message.set('⏳ Deleting course, please wait...');

        
        this.courseService.deleteCourseById(courseId).subscribe({
          next: (success) => {
            if (success) {
              this.status.set('success');
              this.message.set('✅ Course deleted successfully');
            } else {
              this.status.set('error');
              this.message.set('❌ Failed to delete the course');
            }
            setTimeout(() => this.router.navigate(['/admin/subjects']), 2000);
          },
          error: (err) => {
            console.error('Error deleting course:', err);
            this.status.set('error');
            this.message.set('⚠️ Something went wrong while deleting');
            setTimeout(() => this.router.navigate(['/admin/subjects']), 3000);
          }
        });
      } else {
        this.router.navigate(['/admin/subjects']);
      }
    } else {
      this.router.navigate(['/admin/subjects']);
    }
  }
}
