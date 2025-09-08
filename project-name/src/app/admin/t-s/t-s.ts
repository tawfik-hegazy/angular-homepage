import { Component, inject, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses-service';
import { UserService } from '../../services/user-service';
import { Course } from '../../models/course.model';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-t-s',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './t-s.html',
  styleUrl: './t-s.css',
})
export class TSComponent implements OnInit {
  constructor(private router: Router) {}
  private courseServices = inject(CoursesService);

  courses: Course[] = [];

  ngOnInit(): void {
    this.loadCourses();
  }

  //call courses from the backend
  loadCourses() {
    this.courseServices.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data.slice(0);
        console.log(this.courses);
      },
    });
  }
  //------------------------------------------

  //--------------------------------------------



  // i made the functions to but it in a click button in the html to make it navigate on clicking it 
  gotoAddCourse() {
    this.router.navigate(["admin",'addCourse']);
  }
  gotoDeletecourse(id: string | undefined) {
    this.router.navigate(["admin",'deleteCourse', id]);
  }

  gotoEditCourse(id:string|undefined){
    this.router.navigate(["admin","edit-course",id])
  }

  // addToCart(course: Course) {
  //   this.cartService.addToCart(course);
  // }
}
