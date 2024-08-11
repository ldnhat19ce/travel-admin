import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from '../../services/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        loadChildren: () =>
            import('./dashboard/dashboard.module').then(
                (module) => module.DashboardModule
            ),
        canActivate: [authGuard],
    },
    { path: 'authentication', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
