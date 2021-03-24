import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageStudentsComponent } from './components/manage-students/manage-students.component';

const routes: Routes = [
  {path:'',component:ManageStudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

