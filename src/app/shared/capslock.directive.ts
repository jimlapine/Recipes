import { Directive, ElementRef, HostListener, Renderer2  } from '@angular/core';

@Directive({
  selector: '[appCapslock]'
})
export class CapslockDirective {
  isCapsLock = false;
  isShiftPressed = false;

  constructor(private elRef: ElementRef, private render: Renderer2) { }

  switchCapsLock(eventData: KeyboardEvent) {
    const regex = /[a-zA-Z]/
    this.isShiftPressed = eventData.getModifierState('Shift');
    this.isCapsLock = regex.test(eventData.key) &&
      (eventData.key === eventData.key.toLocaleUpperCase() && !this.isShiftPressed);

    if (this.isCapsLock) {
      // this.render.appendChild('li', '<Label class="text-danger">Caps lock is on.</Label>');
      this.render.setAttribute(this.elRef.nativeElement, 'id', 'capslock');
    } else {
      this.render.removeAttribute(this.elRef.nativeElement, 'id');
    }

    // console.log(`isCapsLock: ${ this.isCapsLock }`);
  }

  @HostListener('keydown', ['$event']) keydownWin(eventData: KeyboardEvent) {
    this.switchCapsLock(eventData);
  }
}
