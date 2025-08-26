import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private url = 'http://localhost:5000/users';

  user = new BehaviorSubject<UserModel | null>(null);

  login(email: string, password: string) {
    return this.http.post<any>(`${this.url}/login`, { email, password }).pipe(
      map((response) => {
        if (response.token) {
          const decoded = jwtDecode<any>(response.token);

          const expireDate = new Date(decoded.exp * 1000);

          const loggedInUser = new UserModel(
            decoded.email,
            decoded.id,
            response.token,
            expireDate
          );

          this.user.next(loggedInUser);
          localStorage.setItem('userData',JSON.stringify(loggedInUser));
          return response.data.user;
        } else {
          throw new Error('Token not found in response');
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorResponse = {
      status: 'fail',
      message: 'unknown error',
    };

    if (error.error && error.error.status && error.error.message) {
      errorResponse = {
        status: error.error.status,
        message: error.error.message,
      };
    }

    return throwError(() => errorResponse);
  }

autoLogin(){
  const userDataString=localStorage.getItem("userData");
  if(!userDataString) return;

  const userData=JSON.parse(userDataString);

const loggedUser=new UserModel(
  userData.email,
  userData.id,
  userData._token,
  new Date(userData._expiresIn)
)

if(loggedUser.token){
  this.user.next(loggedUser);
}

//data from response => store it in front (response.data.user) add the new things to be stored
}

 logout() {
    this.user.next(null);
    localStorage.removeItem("userData");
  }


// sign up for later 

//     signup(newUser: any) {
//   return this.http.post<any>(`${this.url}/signup`, newUser).pipe(
//     map((response) => {
//       if (response.token) {
//         const decoded = jwtDecode<any>(response.token);
//         const expirationDate = new Date(decoded.exp * 1000);
//         const loggedInUser = new UserModel(
//           decoded.email,
//           decoded.id,
//           response.token,
//           expirationDate
//         );
//         this.user.next(loggedInUser);
//         localStorage.setItem("userData", JSON.stringify(loggedInUser));
 
//         return response.data.user;
//       } else {
//         throw new Error('Token not found in response');
//       }
//     }),
//     catchError(this.handleError)
//   );
// }
}

