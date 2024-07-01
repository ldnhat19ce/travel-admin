import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavePostImageComponent } from './save-post-image/save-post-image.component';

const routes: Routes = [
    {
        path: 'save',
        component: SavePostImageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostImageRoutingModule {}
