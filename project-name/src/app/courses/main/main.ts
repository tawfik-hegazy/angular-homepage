import { Component, inject, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses-service';
import { UserService } from '../../services/user-service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-Cmain',
  standalone: true,
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class CMain implements OnInit {

  private courseServices = inject(CoursesService);
  private userServices = inject(UserService);

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


  starCourse(courseId: string | undefined) {
    this.userServices.starCourse(courseId).subscribe({
      next: (data) => {
        console.log('stared courses', data);
      },
      error: (err) => {
        console.log(`Error in staring course`, err);
      },
    });
  }
}
