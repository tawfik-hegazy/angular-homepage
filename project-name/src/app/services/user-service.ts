import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { exhaustMap, Observable, take, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private url = 'http://localhost:5000/users'; // the backend working api 
  router: any;


  // to make the user to start the course (i will add the user later not now but it works with a token not any one can star the course unless he signs in )
  starCourse(courseId: string | undefined): Observable<string[]> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`,
        });

        return this.http.post<any>(`${this.url}/star-course`, { courseId }, { headers }).pipe(
          map((response) => {
            return response.data.staredCourse;
          })
        );
      })
    );
  }
 // logout is not used yet for now ##
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/signin']); // to make the user go to the sign in page
  }
}
