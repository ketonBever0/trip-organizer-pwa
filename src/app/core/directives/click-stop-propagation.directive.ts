import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[click-stop-propagation]',
})
export class ClickStopPropagationDirective {
  @HostListener('click', ['$event'])
  public onClick(e: MouseEvent): void {
    e.stopPropagation();
  }
}
