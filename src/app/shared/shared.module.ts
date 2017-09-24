import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownDirective } from './dropdown.directive';
import { DropDownDirectiveAltDirective } from '../shared/dropdown.directive.alt';
@NgModule({
  imports: [
    // Always import this module, it gives you access to common directives
    CommonModule,
  ],
  declarations : [
    DropDownDirective,
    DropDownDirectiveAltDirective
  ],
  exports: [
    // we have to export the drop down directive to make it avaialbel outside of the shared module
    DropDownDirective,
    DropDownDirectiveAltDirective
  ]
})
export class SharedModule {

}
