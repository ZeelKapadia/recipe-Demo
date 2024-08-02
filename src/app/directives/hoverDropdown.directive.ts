import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appHoverDropdown]',
    exportAs: 'appHoverDropdown',
    standalone: true
})
export class HoverDropdownDirective {
    @HostBinding('class.open') isOpen = false;
    @HostListener('mouseenter') onMouseEnter() {
        this.isOpen = true;
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.isOpen = false;
    }
    // Following Host Listner is used to close the dropdown from anywhere
    @HostListener('document:click', ['$event']) onSelectDetails(event: MouseEvent) {
        this.isOpen = false;
    }
}