import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from '../../../services/auth/auth.guard';

const routes: Routes = [
    // { path: '', component: HomeComponent },
    { path: 'category', loadChildren: () =>
        import('./category/category.module').then(
            (module) => module.CategoryModule
        ),
    canActivate: [authGuard], },
    { path: 'post', loadChildren: () =>
        import('./post/post.module').then(
            (module) => module.PostModule
        ),
    canActivate: [authGuard], },
    { path: 'post-form', loadChildren: () =>
        import('./post-form/post-form.module').then(
            (module) => module.PostFormModule
        ),
    canActivate: [authGuard], }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
