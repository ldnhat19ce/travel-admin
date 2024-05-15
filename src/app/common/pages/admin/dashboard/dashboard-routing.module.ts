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
    canActivate: [authGuard], }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
