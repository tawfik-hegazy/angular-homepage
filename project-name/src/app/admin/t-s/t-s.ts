import { Component, inject, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses-service';
import { UserService } from '../../services/user-service';
import { Course } from '../../models/course.model';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-t-s',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './t-s.html',
  styleUrl: './t-s.css'
})
export class TSComponent implements OnInit {
constructor(private router: Router) {}
  private courseServices = inject(CoursesService);

courses: Course[] = [];

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseServices.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data.slice(1); 
        console.log(this.courses);
      },
    });
  }
//------------------------------------------



//--------------------------------------------

  gotoAddCourse(){
  this.router.navigate(["addCourse"])
}
gotoDeletecourse(id: string | undefined) {
  this.router.navigate(['deleteCourse', id]);
}



// gotoEditCourse(id:string|undefined){
//   this.router.navigate(["edit-course",id])
// }

  // addToCart(course: Course) {
  //   this.cartService.addToCart(course);
  // }
}

