import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavePostComponent } from './save-post/save-post.component';
import { ListPostComponent } from './list-post/list-post.component';

const routes: Routes = [
    { path: 'save', component: SavePostComponent },
    { path: '', component: ListPostComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostRoutingModule {}
