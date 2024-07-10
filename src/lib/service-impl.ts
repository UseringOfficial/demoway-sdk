import { filter, firstValueFrom, fromEvent, type Observable } from 'rxjs';
import { DEMOWAY_DEMO_DIALOG_LOAD } from './constants';
import { DemoDialogController } from './demo-dialog';
import type { ISDKService } from './service-host';
import type { IDemoDialog, IDemoDialogOptions, IRecorderService, ISDKAttributes, ISDKInitializeOptions } from './types';
import { normalizeOrigin } from './utils';

export class ServiceImpl implements ISDKService {
  private readonly options: ISDKInitializeOptions;
  private readonly demoLoad$: Observable<MessageEvent>;

  private recorderServiceDelegate: Promise<IRecorderService> | null = null;
  private demoDialog: IDemoDialog | null = null;

  constructor(options: ISDKInitializeOptions) {
    this.options = options;

    this.demoLoad$ = fromEvent<MessageEvent>(window, 'message').pipe(
      filter((e) => e.origin === normalizeOrigin(options) && e.data?.type === DEMOWAY_DEMO_DIALOG_LOAD),
    );
  }

  public openDemoDialog(demoId: string, options?: IDemoDialogOptions | undefined): Promise<IDemoDialog> {
    if (this.demoDialog) {
      this.demoDialog.close();
    }

    const load = firstValueFrom(this.demoLoad$.pipe(filter((event) => event.data?.demoId === demoId)));

    const element = document.createElement('demoway-demo-dialog');
    element.demoId = demoId;
    element.checklistId = options?.checklistId;
    element.zIndex = options?.zIndex;
    element.options = this.options;
    document.body.appendChild(element);
    const controller = new DemoDialogController(element);

    return load.then(() => controller);
  }

  public enableRecord(): Promise<void> {
    if (!this.recorderServiceDelegate) {
      this.recorderServiceDelegate = this.loadRecorder();
    }
    return this.recorderServiceDelegate.then((service) => service.enableRecord());
  }

  private loadRecorder(): Promise<IRecorderService> {
    return import(this.options.endpoint ?? 'https://s.dwimg.top/sdk/sdk-service/index.js').then((module) => {
      const { userInfo, ...otherOptions } = this.options;

      return module.initialize({ ...otherOptions, attributes: { userInfo: userInfo } as ISDKAttributes });
    });
  }
}
