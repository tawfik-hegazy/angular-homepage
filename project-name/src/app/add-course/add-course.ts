import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, ReactiveFormsModule ,Validators} from '@angular/forms';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css'
})
export class AddCourse implements OnInit{

  courseForm !:FormGroup;  // courseForm ! (!: means will be initialized later)

  ngOnInit():void{
//form controls
    //connecting the inputs with the value 
this.courseForm=new FormGroup({
courseName:new FormControl(null,Validators.required),
teacherName:new FormControl(null,Validators.required),
price:new FormControl(null,Validators.required),
image: new FormControl(null, [
    Validators.required,
    Validators.pattern(/([^\\s]+(\.(jpg|png|gif|jpeg|webp))$)/i)
  ]),
})
  }

  onsubmit(){
    console.log(this.courseForm)
  }
setCourse() {
  this.courseForm.setValue({
    teacherName: "Mr.Sameh Nashaat",
    courseName: "Geology",
    price: 90,
    image: "sameh.jpg"
  });
}



}
