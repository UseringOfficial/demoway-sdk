import autoBind from 'auto-bind';
import { mount, unmount } from 'svelte';

import DemoDialog from '../components/demo-dialog.svelte';
import type { IDemoDialog, IDemoDialogOptions } from './types';

export class DemoDialogController implements IDemoDialog {
  private readonly element: ReturnType<typeof mount>;

  constructor(href: string, origin: string, options?: IDemoDialogOptions) {
    autoBind(this);

    this.element = mount(DemoDialog, {
      target: document.body,
      props: {
        href,
        origin,
        class: options?.class,
        backdropClass: options?.backdropClass,
        close: this.close,
      },
    });
  }

  public close() {
    unmount(this.element);
  }
}
