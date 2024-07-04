import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveProductComponent } from './save-product/save-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductAmtComponent } from './product-amt/product-amt.component';

const routes: Routes = [
    { path: 'save', component: SaveProductComponent },
    { path: 'list', component: ListProductComponent },
    { path: 'amt', component: ProductAmtComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductRoutingModule {}
