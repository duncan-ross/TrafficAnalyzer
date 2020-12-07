import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainFormComponent } from './main-form/main-form.component';

const routes: Routes = [
  { path: '', component: MainFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
