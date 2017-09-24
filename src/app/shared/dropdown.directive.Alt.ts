import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdownAlt]'
})
export class DropDownDirectiveAltDirective {
  /*
    Bind to class property class.open when isOpen = true;
    when true open class is added
    when false open class is not added
  */
  @HostBinding('class.open') isOpen = false;

  constructor() { }

  /*
    Allows us to listen for events on the element the appBetterHighlight
    is associated to
  */
  @HostListener('click') clicked(eventData: Event) {
    // Toggle property
    this.isOpen = !this.isOpen;
  }
}
