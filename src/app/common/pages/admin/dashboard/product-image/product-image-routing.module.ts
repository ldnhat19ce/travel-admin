import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveProductImageComponent } from './save-product-image/save-product-image.component';

const routes: Routes = [
    {
        path: 'save',
        component: SaveProductImageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductImageRoutingModule {}
