import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../../../../layout/header/header.module';
import { FooterModule } from '../../../../layout/footer/footer.module';
import { SidebarModule } from '../../../../layout/sidebar/sidebar.module';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        RouterModule,
        HeaderModule,
        FooterModule,
        SidebarModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
}
