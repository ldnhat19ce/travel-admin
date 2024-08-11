import { Component, ElementRef, OnInit } from '@angular/core';
import { LayoutService } from '../../common/services/layout/app.layout.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService,
                public el: ElementRef) {

    }

    ngOnInit() {
        this.model = [
            {
                label: 'Trang chủ',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Thể loại',
                items: [
                    { label: 'Thêm thể loại', icon: 'pi pi-fw pi-save', routerLink: ['/category/save'] }
                ]
            },
            {
                label: 'Quản lý Sản phẩm',
                items: [
                    { label: 'Thêm sản phẩm', icon: 'pi pi-fw pi-save', routerLink: ['/product/save'], badge: 'NEW' },
                    { label: 'Hình ảnh sản phẩm', icon: 'pi pi-fw pi-images', routerLink: ['/product-image/save'] },
                    { label: 'Tìm kiếm sản phẩm', icon: 'pi pi-fw pi-search', routerLink: ['/product/list'] },
                    { label: 'Giá sản phẩm', icon: 'pi pi-fw pi-dollar', routerLink: ['/product/amt'] },
                    { label: 'Sản phẩm liên quan', icon: 'pi pi-fw pi-list', routerLink: ['/product/related'] },
                ]
            },
            {
                label: 'Quản lý đặt hàng',
                items: [
                    { label: 'Tìm kiếm đơn hàng', icon: 'pi pi-fw pi-search', routerLink: ['/booking'] },
                ]
            },
            {
                label: 'Quản lý bài viết',
                items: [
                    { label: 'Thêm bài viết', icon: 'pi pi-fw pi-save', routerLink: ['/post/save'] },
                    { label: 'Tìm kiếm bài viết', icon: 'pi pi-fw pi-search', routerLink: ['/post'] },
                    { label: 'Thêm tiêu đề bài viết', icon: 'pi pi-fw pi-save', routerLink: ['/post-form-definition/save'] },
                    { label: 'Tìm kiếm bài viết submit', icon: 'pi pi-fw pi-search', routerLink: ['/post-form/result'] },
                ]
            },
            {
                label: 'Quản lý mã',
                items: [
                    { label: 'Tìm kiếm mã', icon: 'pi pi-fw pi-search', routerLink: ['/code/list'] },
                ]
            },
        ];
    }
}
