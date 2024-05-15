import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';
import { TranslateModule } from '@ngx-translate/core';
import { TransformCategoryPipe } from '../../common/pipe/transform-category.pipe';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        HeaderRoutingModule,
        TranslateModule,
        TransformCategoryPipe
    ],
    exports: [HeaderComponent]
})
export class HeaderModule {}
