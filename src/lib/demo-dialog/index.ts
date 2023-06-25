import DialogComponent from './demo-dialog.svelte';

export interface IDemoDialog {
  close(): void;
}

class DemoDialog implements IDemoDialog {
  private component: DialogComponent | null = null;

  constructor() {
    this.component = new DialogComponent({
      target: document.body,
    });
  }

  public close(): void {
    this.component?.$destroy();
    this.component = null;
  }
}

export function openDemoDialog(): IDemoDialog {
  return new DemoDialog();
}
