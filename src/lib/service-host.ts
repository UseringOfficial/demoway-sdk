import bind from 'auto-bind';
import type { IDemoDialog, IDemoDialogOptions } from './demo-dialog';

export interface ISDKService {
  openDemoDialog(demoId: string, options?: IDemoDialogOptions): Promise<IDemoDialog>;
  enableRecord(): Promise<void>;
}

export class ServiceHost implements ISDKService {
  constructor(public delegate: Promise<ISDKService>) {
    bind(this);
  }

  public enableRecord(): Promise<void> {
    return this.delegate.then((service) => service.enableRecord());
  }

  public openDemoDialog(demoId: string, options?: IDemoDialogOptions): Promise<IDemoDialog> {
    return this.delegate.then((service) => service.openDemoDialog(demoId, options));
  }
}
