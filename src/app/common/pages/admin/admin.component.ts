import { Component, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { HeaderComponent } from '../../../layout/header/header.component';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { LayoutService } from '../../services/layout/app.layout.service';
import { CommonModule } from '@angular/common';
import { FooterModule } from '../../../layout/footer/footer.module';
import { HeaderModule } from '../../../layout/header/header.module';
import { ProductSidebarComponent } from '../general/sidebar/product-sidebar/product-sidebar.component';
import { registerPlugin } from 'filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import { SidebarModule } from '../../../layout/sidebar/sidebar.module';

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);


@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
        RouterModule,
        HeaderModule,
        FooterModule,
        SidebarModule,
        CommonModule,
        ProductSidebarComponent
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
})
export class AdminComponent {
    overlayMenuOpenSubscription: Subscription = {} as Subscription;

    menuOutsideClickListener: any;

    profileMenuOutsideClickListener: any;

    @ViewChild(SidebarComponent)
    sidebar!: SidebarComponent;

    @ViewChild(HeaderComponent)
    header!: HeaderComponent;

    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router
    ) {
        this.overlayMenuOpenSubscription =
            this.layoutService.overlayOpen$.subscribe(() => {
                if (!this.menuOutsideClickListener) {
                    this.menuOutsideClickListener = this.renderer.listen(
                        'document',
                        'click',
                        (event) => {
                            const isOutsideClicked = !(
                                this.sidebar.el.nativeElement.isSameNode(
                                    event.target
                                ) ||
                                this.sidebar.el.nativeElement.contains(
                                    event.target
                                ) ||
                                this.header.menuButton.nativeElement.isSameNode(
                                    event.target
                                ) ||
                                this.header.menuButton.nativeElement.contains(
                                    event.target
                                )
                            );

                            if (isOutsideClicked) {
                                this.hideMenu();
                            }
                        }
                    );
                }

                if (!this.profileMenuOutsideClickListener) {
                    this.profileMenuOutsideClickListener = this.renderer.listen(
                        'document',
                        'click',
                        (event) => {
                            const isOutsideClicked = !(
                                this.header.menu.nativeElement.isSameNode(
                                    event.target
                                ) ||
                                this.header.menu.nativeElement.contains(
                                    event.target
                                ) ||
                                this.header.topbarMenuButton.nativeElement.isSameNode(
                                    event.target
                                ) ||
                                this.header.topbarMenuButton.nativeElement.contains(
                                    event.target
                                )
                            );

                            if (isOutsideClicked) {
                                this.hideProfileMenu();
                            }
                        }
                    );
                }

                if (this.layoutService.state.staticMenuMobileActive) {
                    this.blockBodyScroll();
                }
            });

        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
                this.hideProfileMenu();
            });
    }

    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    hideProfileMenu() {
        this.layoutService.state.profileSidebarVisible = false;
        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(
                new RegExp(
                    '(^|\\b)' +
                        'blocked-scroll'.split(' ').join('|') +
                        '(\\b|$)',
                    'gi'
                ),
                ' '
            );
        }
    }

    get containerClass() {
        return {
            'layout-theme-light':
                this.layoutService.config().colorScheme === 'light',
            'layout-theme-dark':
                this.layoutService.config().colorScheme === 'dark',
            'layout-overlay':
                this.layoutService.config().menuMode === 'overlay',
            'layout-static': this.layoutService.config().menuMode === 'static',
            'layout-static-inactive':
                this.layoutService.state.staticMenuDesktopInactive &&
                this.layoutService.config().menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active':
                this.layoutService.state.staticMenuMobileActive,
            'p-input-filled':
                this.layoutService.config().inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config().ripple,
        };
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }
}
