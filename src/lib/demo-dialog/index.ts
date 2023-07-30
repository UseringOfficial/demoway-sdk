import { getToken } from '../access-token';
import './demo-dialog.svelte';

export interface IDemoDialogOptions {
  zIndex?: number;
}

export interface IDemoDialog {
  demoId: string | null;
  close(): void;
}

class DemoDialog implements IDemoDialog {
  private component: HTMLElement;

  public get demoId(): string | null {
    return this.component.getAttribute('demo-id');
  }

  public set demoId(value: string | null) {
    if (!value) {
      return;
    }
    this.component.setAttribute('demo-id', value);
  }

  constructor(demoId: string, { zIndex = 10100 }: IDemoDialogOptions) {
    const el = document.createElement('demoway-demo-dialog');
    this.component = el;
    el.setAttribute('demo-id', demoId);
    el.style.zIndex = String(zIndex);
    el.addEventListener('close', () => {
      this.close();
    });

    document.body.appendChild(el);
  }

  public close(): void {
    if (this.component) {
      document.body.removeChild(this.component);
    }
  }
}

export function openDemoDialog(demoId: string, options: IDemoDialogOptions = {}): IDemoDialog {
  return new DemoDialog(demoId, options);
}
