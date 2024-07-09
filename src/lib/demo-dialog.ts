import autoBind from 'auto-bind';
import type { DemoDialogElement, IDemoDialog, IDemoDialogOptions, ISDKInitializeOptions } from './types';
import '../components/demo-dialog.svelte';

export class DemoDialogController implements IDemoDialog {
  private readonly element: DemoDialogElement;

  constructor(element: DemoDialogElement) {
    this.element = element;
    autoBind(this);
  }

  public close() {
    if (!document.body.contains(this.element)) {
      return;
    }
    document.body.removeChild(this.element);
  }
}
