import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  starCourse() {
    throw new Error('Method not implemented.');
  }
  
   private http= inject(HttpClient)

 private url = 'http://localhost:5000/courses';
 
getAllCourses():Observable<Course[]>{//Course here is the one we created in the services 
return  this.http.get<any>(this.url).pipe(map((response)=>{
  return response.data.courses
}))//return response

}
addCourse(course:FormData):Observable<Course>{
return this.http.post<any>(this.url,course).pipe(map((response)=>{
  return response.data.course;
}))
}
updateCourse(id: string | undefined, updatedData: FormData): Observable<Course> {
  return this.http.patch<{ status: string; data: { course: Course } }>(`${this.url}/${id}`, updatedData)
    .pipe(map(response => response.data.course));
}


getCourseByid(id: string | null): Observable<Course> {
  return this.http.get<{ status: string; data: { course: Course } }>(`${this.url}/${id}`)
    .pipe(map(response => response.data.course));
}
deleteCourseById(id: string | null): Observable<boolean> {
  return this.http.delete<any>(`${this.url}/${id}`).pipe(
    map((response) => response.status === 'success')
  );
}

}
