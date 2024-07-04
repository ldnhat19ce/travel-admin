import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCodeComponent } from './list-code/list-code.component';

const routes: Routes = [
    { path: "list", component: ListCodeComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CodeRoutingModule {}
