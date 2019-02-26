import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[xChangeAnchor]'
})
export class AnchorDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
