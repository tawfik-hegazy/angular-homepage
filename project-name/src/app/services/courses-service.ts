import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, take, exhaustMap } from 'rxjs';
import { Course } from '../models/course.model';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private url = 'http://localhost:5000/courses'; // el api el fi backend

  // Get all courses
  getAllCourses(): Observable<Course[]> {
    return this.http.get<any>(this.url).pipe(
      map((response) => response.data.courses)
    );
  }

  // Add a new course
  addCourse(course: FormData): Observable<Course> {
    return this.http.post<any>(this.url, course).pipe(
      map((response) => response.data.course)
    );
  }

  // Update course (lazem ykon signed in 3ashan token w keda)
  updateCourse(id: string | undefined, updatedData: FormData): Observable<Course> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`,
        });

        return this.http
          .patch<{ status: string; data: { course: Course } }>(
            `${this.url}/${id}`,
            updatedData,
            { headers }
          )
          .pipe(map((response) => response.data.course));
      })
    );
  }

  // Get a course by ID
  getCourseByid(id: string | null): Observable<Course> {
    return this.http
      .get<{ status: string; data: { course: Course } }>(`${this.url}/${id}`)
      .pipe(map((response) => response.data.course));
  }

  // Delete a course
  deleteCourseById(id: string | null): Observable<boolean> {
    return this.http
      .delete<any>(`${this.url}/${id}`)
      .pipe(map((response) => response.status === 'success'));
  }
}
