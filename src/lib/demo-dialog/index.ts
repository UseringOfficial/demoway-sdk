import DialogComponent from './demo-dialog.svelte';

export interface IDemoDialog {
  demoId: string;
  close(): void;
}

class DemoDialog implements IDemoDialog {
  private component: DialogComponent;

  public get demoId(): string {
    return this.component.demoId;
  }

  public set demoId(value: string) {
    this.component.$set({
      demoId: value,
    });
  }

  constructor(demoId: string) {
    this.component = new DialogComponent({
      target: document.body,
      props: {
        demoId,
      },
    });

    this.component.$on('close', () => {
      this.close();
    });
  }

  public close(): void {
    this.component?.$destroy();
  }
}

export function openDemoDialog(demoId: string): IDemoDialog {
  return new DemoDialog(demoId);
}
