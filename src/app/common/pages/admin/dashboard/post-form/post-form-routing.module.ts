import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavePostFormComponent } from './save-post-form/save-post-form.component';
import { ListPostFormResultComponent } from './list-post-form-result/list-post-form-result.component';

const routes: Routes = [
    { path: 'save/:id', component: SavePostFormComponent },
    { path: 'result', component: ListPostFormResultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostFormRoutingModule { }
