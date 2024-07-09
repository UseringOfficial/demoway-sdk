import bind from 'auto-bind';
import type { IDemoDialog, IDemoDialogOptions, IRecorderService } from './types';

export interface ISDKService extends IRecorderService {
  openDemoDialog(demoId: string, options?: IDemoDialogOptions): Promise<IDemoDialog>;
}

export class ServiceHost implements ISDKService {
  private delegate: ISDKService;

  constructor(delegate: ISDKService) {
    this.delegate = delegate;
    bind(this);
  }

  public initialize(delegate: ISDKService): void {
    this.delegate = delegate;
  }

  public enableRecord(): Promise<void> {
    return this.delegate.enableRecord();
  }

  public openDemoDialog(demoId: string, options?: IDemoDialogOptions): Promise<IDemoDialog> {
    return this.delegate.openDemoDialog(demoId, options);
  }
}
