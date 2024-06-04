import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavePostFormComponent } from './save-post-form/save-post-form.component';

const routes: Routes = [
    { path: 'save/:id', component: SavePostFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostFormRoutingModule { }
