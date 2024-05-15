import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveCategoryComponent } from './save-category/save-category.component';

const routes: Routes = [
    { path: 'save', component: SaveCategoryComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoryRoutingModule {}
