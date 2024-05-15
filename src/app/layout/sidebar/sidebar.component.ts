import { Component } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {

    onCloseSidebarMobile() {
        let mainWrapper = <HTMLDivElement> document.getElementById("main-wrapper");
        if(mainWrapper.classList.contains("show-sidebar")) {
            mainWrapper.classList.remove("show-sidebar");
        }
    }
}
