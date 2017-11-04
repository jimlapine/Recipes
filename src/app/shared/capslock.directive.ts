import { Directive, ElementRef, HostListener, Renderer2  } from '@angular/core';

@Directive({
  selector: '[appCapslock]'
})
export class CapslockDirective {
  isCapsLock = false;
  keyStroke = 0;

  constructor(private elRef: ElementRef, private render: Renderer2) { }

  switchCapsLock(eventData: KeyboardEvent) {
    this.isCapsLock = eventData.key === 'CapsLock' && this.keyStroke === 0;
    this.keyStroke =  eventData.key === 'CapsLock' && this.keyStroke === 0 ? 1 : 0;
    console.log(`isCapsLock: ${ this.isCapsLock }`);
  }

  // @HostListener('document:keydown', ['$event']) keydown(eventData: KeyboardEvent) {
  //   this.switchCapsLock(eventData);
  //   console.log(`this.isCapsLock down: ${this.isCapsLock} keystroke: ${ this.keyStroke } `);
  //   // <Label class="text-danger">Caps lock is on.</Label>
  //   if (this.isCapsLock) {
  //     // this.render.appendChild('li', '<Label class="text-danger">Caps lock is on.</Label>');
  //     this.render.setAttribute(this.elRef.nativeElement, 'id', 'capslock');
  //   } else {
  //     this.render.removeAttribute(this.elRef.nativeElement, 'id');
  //   }
  // }

  @HostListener('window:keydown', ['$event']) keydownWin(eventData: KeyboardEvent) {
    this.switchCapsLock(eventData);

    if (this.isCapsLock) {
      // this.render.appendChild('li', '<Label class="text-danger">Caps lock is on.</Label>');
      this.render.setAttribute(this.elRef.nativeElement, 'id', 'capslock');
    } else {
      this.render.removeAttribute(this.elRef.nativeElement, 'id');
    }
  }
}
