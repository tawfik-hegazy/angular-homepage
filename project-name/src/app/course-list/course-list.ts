
// Not Used 


import { Component, inject, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses-service';
import { Course } from '../models/course.model';
import id from '@angular/common/locales/id';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-course-list',
  imports: [],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {
 
  private courseServices=inject(CoursesService);
  private userServices=inject(UserService);
  courses: Course[]=[];
ngOnInit():void{
  this.loadCourses();
}
  loadCourses(){
this.courseServices.getAllCourses().subscribe({
next:(data)=>{
  
  this.courses=data;
  console.log(this.courses)
},

})


}
// addCourse(){
//    const newCourse: Course = {
//       name: 'Ahmed El Awamry',
//       language: 'English',
//       description: 'A sci-fi course about dreams within dreams.',
//       duration: 148,
//       totalRatings: 0,
//       releaseYear: 2010,
//       releaseDate: '2010-07-16',
//       createdAt: new Date().toISOString(),
//       generes: ['Sci-Fi', 'Action'],
//       directors: ['Christopher Nolan'],
//       coverImage: 'https://example.com/inception.jpg',
//       actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
//       price: 100,
//       isAvailable: true
//     };
//   this.courseServices.addCourse(newCourse).subscribe({
//     next:(data)=>{
//       console.log('Course created', data);
//     },
//   })
// }
//----------------------------------------------------------------------------------------------------------------##
// updateCourse(id:(string|undifiend)){
// this.courseServices.updateCourse(id,{name:'updated name'}).subscribe({
//   next:(data)=>{
//     console.log('course updated',data);
//   }
// })

// }

starCourse(courseId: string|undefined) {
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
