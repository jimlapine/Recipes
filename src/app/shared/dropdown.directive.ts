import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropDownDirective {
  isOpen = false;

  constructor(private elRef: ElementRef, private render: Renderer2) { }

  /*
    Allows us to listen for events on the element the appBetterHighlight
    is associated to
  */
  @HostListener('click') clicked(eventData: Event) {
    if (!this.isOpen) {
      this.render.addClass(this.elRef.nativeElement, 'open');
      this.isOpen = true;
    } else {
      this.render.removeClass(this.elRef.nativeElement, 'open');
      this.isOpen = false;
    }
  }
}
