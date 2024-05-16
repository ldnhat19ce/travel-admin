import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavePostComponent } from './save-post/save-post.component';

const routes: Routes = [
    { path: 'save', component: SavePostComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostRoutingModule {}
