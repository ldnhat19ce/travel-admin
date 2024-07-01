import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // { path: '', component: HomeComponent },
    {
        path: 'category',
        loadChildren: () =>
            import('./category/category.module').then(
                (module) => module.CategoryModule
            ),
    },
    {
        path: 'post',
        loadChildren: () =>
            import('./post/post.module').then((module) => module.PostModule),
    },
    {
        path: 'post-form',
        loadChildren: () =>
            import('./post-form/post-form.module').then(
                (module) => module.PostFormModule
            ),
    },
    {
        path: 'post-form-definition',
        loadChildren: () =>
            import('./post-form-definition/post-form-definition.module').then(
                (module) => module.PostFormDefinitionModule
            ),
    },
    {
        path: 'post-image',
        loadChildren: () =>
            import('./post-image/post-image.module').then(
                (module) => module.PostImageModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
