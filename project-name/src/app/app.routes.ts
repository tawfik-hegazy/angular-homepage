import { Routes } from '@angular/router';
import { CMain } from './courses/main/main';
import { Main } from './main/main';
import { Signin } from './signin/signin';
import { Contactus } from './contactus/contactus';
import { About } from './about/about';
import { NotFound } from './not-found/not-found';
import { AddCourse } from './add-course/add-course';
import { Admin } from './admin/admin';
import { TSComponent } from './admin/t-s/t-s';
import { AdminHeader } from './admin/admin-header/admin-header';
import { authGuardGuard } from './guards/auth-guard-guard';
import { authChildGuard } from './guards/auth-child-guard';
import { unsavedChangesGuard } from './guards/unsaved-changes-guard';
import { DeleteCourseComponent } from './delete-course/delete-course';
import { EditCourseComponent } from './edit-course/edit-course';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Main, title: 'Home' },
  { path: 'subjects', component: CMain },

  { path: 'contact Us', component: Contactus, title: 'contact Us' },
  { path: 'subjects', component: CMain, title: 'subjects' },
  { path: 'about', component: About, title: 'About Us' },

  { path: 'signin', component: Signin, title: 'sign in' },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'admin/dashboard',
    component: Admin,
    canActivate: [authGuardGuard],
    canActivateChild: [authChildGuard],
    title: 'Admin DashBoard',
    children: [

    ],

  },
        {
        path: 'addCourse',
        component: AddCourse,
        title: 'Add Course',
        // canDeactivate: [unsavedChangesGuard],
      },
      { path: 'admin/subjects', component: TSComponent, canActivate: [authGuardGuard],
    canActivateChild: [authChildGuard],title: 'Teachers & Subjects' },

{ path: 'deleteCourse/:id', component: DeleteCourseComponent},
 { path: 'edit-course/:id', component: EditCourseComponent },
  { path: 'admin', component: AdminHeader, canActivate: [authGuardGuard],
    canActivateChild: [authChildGuard],title: 'Teachers & Subjects' },
  { path: '**', component: NotFound, title: 'page-notFound' },
  
];
