import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponent } from './sidebar.component';
import { MenuitemComponent } from '../menuitem/menuitem.component';

@NgModule({
    declarations: [SidebarComponent],
    imports: [
        CommonModule,
        SidebarRoutingModule,
        MenuitemComponent
    ],
    exports: [SidebarComponent]
})
export class SidebarModule {}
