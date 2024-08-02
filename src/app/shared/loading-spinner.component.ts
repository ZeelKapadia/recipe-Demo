import { Component } from "@angular/core";

@Component({
    selector: 'app-loading-spinner',
    standalone: true,
    template: '<div class="lds-dual-ring"></div>',
    styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

}