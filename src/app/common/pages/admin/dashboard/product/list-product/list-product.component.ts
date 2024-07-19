import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FilterService } from 'primeng/api';

@Component({
    selector: 'app-list-product',
    standalone: true,
    imports: [
        CommonModule,
    ],
    providers: [FilterService],
    templateUrl: './list-product.component.html',
    styleUrl: './list-product.component.scss',
})
export class ListProductComponent {

}
