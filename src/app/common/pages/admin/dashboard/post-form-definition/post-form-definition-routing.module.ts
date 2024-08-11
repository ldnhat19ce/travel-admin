import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavePostFormDefComponent } from './save-post-form-def/save-post-form-def.component';

const routes: Routes = [
    { path: 'save', component: SavePostFormDefComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostFormDefinitionRoutingModule {}
