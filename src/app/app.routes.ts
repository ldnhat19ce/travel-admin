import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/pages/general/not-found/not-found.component';

export const routes: Routes = [
    { path: '', loadChildren: () => import("./common/pages/admin/admin.module").then(module => module.AdminModule) },
    { path: '**', component: NotFoundComponent }
];

