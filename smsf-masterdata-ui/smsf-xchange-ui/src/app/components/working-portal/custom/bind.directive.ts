import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[xChangeBind]'
})
export class BindDirective implements OnInit, OnChanges {

  @Input()
  xChangeBind: string[];
  @Output()
  xChangeBindChange = new EventEmitter<string[]>();

  el: Element;

  constructor(private rf: ElementRef, private renderer2: Renderer2) {
    this.el = this.rf.nativeElement;

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
