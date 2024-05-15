import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';
import { TranslateModule } from '@ngx-translate/core';
import { TransformBookingPipe } from '../../common/pipe/transform-booking.pipe';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        HeaderRoutingModule,
        TranslateModule,
        TransformBookingPipe
    ],
    exports: [HeaderComponent]
})
export class HeaderModule {}
