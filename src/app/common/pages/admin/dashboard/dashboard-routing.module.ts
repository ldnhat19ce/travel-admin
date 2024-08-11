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
        path: 'product-image',
        loadChildren: () =>
            import('./product-image/product-image.module').then(
                (module) => module.ProductImageModule
            ),
    },
    {
        path: 'product',
        loadChildren: () =>
            import('./product/product.module').then(
                (module) => module.ProductModule
            ),
    },
    {
        path: 'code',
        loadChildren: () =>
            import('./code/code.module').then(
                (module) => module.CodeModule
            ),
    },
    {
        path: 'booking',
        loadChildren: () =>
            import('./booking/booking.module').then(
                (module) => module.BookingModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
