import { Component } from '@angular/core';
import {
  WindowService,
  WindowRef,
  WindowCloseResult,
} from '@progress/kendo-angular-dialog';

@Component({
  selector: 'my-app',
  template: `
        <div class="example-wrapper">
            <button kendoButton (click)="openWindow()">Open Window</button>
        </div>

        <div kendoWindowContainer></div>
    `,
})
export class AppComponent {
  constructor(private windowService: WindowService) {}

  public openWindow(): void {
    const window: WindowRef = this.windowService.open({
      title: 'My Window',
      content: 'My Content!',
      width: 700,
      height: 200,
    });
    window.result.subscribe((result) => {
      if (result instanceof WindowCloseResult) {
        console.log('Window was closed!');
      }
    });

    window.window.instance.widthChange.subscribe((width) => {
      console.log(width);
      if (window.window.instance.width > 500) {
        window.window.instance.setDimension('width', 500);
      }
    });

    window.window.instance.widthChange.emit(window.window.instance.width);
  }
}
