import { getToken } from '../access-token';
import DialogComponent from './demo-dialog.svelte';

export interface IDemoDialogOptions {
  zIndex?: number;
}

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

  constructor(demoId: string, { zIndex = 10100 }: IDemoDialogOptions) {
    this.component = new DialogComponent({
      target: document.body,
      props: {
        demoId,
        accessToken: getToken(),
        zIndex,
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

export function openDemoDialog(demoId: string, options: IDemoDialogOptions = {}): IDemoDialog {
  return new DemoDialog(demoId, options);
}
