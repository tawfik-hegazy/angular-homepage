import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  subjects = [
    {
      id: 1,
      name: 'Mr.Reda El Farouk',
      subject: 'Arabic',
      description:
        'Learn Arabic with the most important teachers in the field — with Mr. Reda Elfarouk guiding you to excellence.',
      Image: 'assets/reda.jpg',
    },
    {
      id: 2,
      name: 'Mr.Ashraf El Shenawy',
      subject: 'Chemistry',
      description:
        'Master Chemistry with deep understanding and simplicity — with Mr. Ashraf El Shenawy, one of the best in the field.',
      Image: '../assets/ashraf.jpg',
    },
    {
       id: 3,
      name: 'Mr.Sameh Nashaat',
      subject: 'Geology',
      description:
        'Explore the structure of the Earth and geological phenomena with Mr. Sameh Nashaat — clear, engaging lessons tailored for all levels.',
      Image: '../assets/sameh.jpg',
    },
        {
       id: 4,
      name: 'Dr. Mohamed Daif',
      subject: 'Biology',
      description:
        'Understand the wonders of life sciences with Dr. Daif — clear explanations, smart diagrams, and real-world examples to boost your biology skills.',
      Image: '../assets/daif.jpg',
    },
     {
       id: 5,
      name: 'Mr.Mohamed Tolba ',
      subject: 'History',
      description:
        'Travel through time and understand historical events with Mr. Mohamed Tolba — engaging storytelling that brings the past to life.',
      Image: '../assets/tolba.jpg',
    }
  ];
    constructor(private router: Router) {}

  goToSubjects() {
    this.router.navigate(['/subjects']);
  }

  goToabout() {
    this.router.navigate(['/about']);
  }
}
