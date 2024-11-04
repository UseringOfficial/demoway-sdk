import { filter, firstValueFrom, fromEvent, type Observable } from 'rxjs';
import { DEMOWAY_DEMO_DIALOG_LOAD } from './constants';
import { DemoDialogController } from './demo-dialog';
import type { ISDKService } from './service-host';
import type {
  IDemoDialog,
  IDemoDialogOptions,
  IDemoUrlParams,
  IRecorderService,
  ISDKAttributes,
  ISDKInitializeOptions,
} from './types';
import { normalizeOrigin } from './utils';

export class ServiceImpl implements ISDKService {
  private readonly options: ISDKInitializeOptions;
  private readonly demoLoad$: Observable<MessageEvent>;
  private readonly origin: string;

  private recorderServiceDelegate: Promise<IRecorderService> | null = null;
  private demoDialog: IDemoDialog | null = null;

  constructor(options: ISDKInitializeOptions) {
    this.options = options;
    this.origin = normalizeOrigin(options);

    this.demoLoad$ = fromEvent<MessageEvent>(window, 'message').pipe(
      filter((e) => e.origin === normalizeOrigin(options) && e.data?.type === DEMOWAY_DEMO_DIALOG_LOAD),
    );
  }

  public getDemoUrl(demoId: string, params?: IDemoUrlParams): string {
    const origin = normalizeOrigin(this.options);
    const url = new URL(`/demo/${demoId}`, origin);
    url.searchParams.set('browser', String(true));
    url.searchParams.set('scaleDown', String(false));
    url.searchParams.set('scale', String(100));
    url.searchParams.set('client', 'sdk');
    url.searchParams.set('token', this.options.accessToken);
    if (params?.checklistId) {
      url.searchParams.set('checklistId', params.checklistId);
    }
    return url.href;
  }

  public openDemoDialog(demoId: string, options?: IDemoDialogOptions | undefined): Promise<IDemoDialog> {
    if (this.demoDialog) {
      this.demoDialog.close();
    }

    const load = firstValueFrom(this.demoLoad$.pipe(filter((event) => event.data?.demoId === demoId)));

    const href = this.getDemoUrl(demoId, options);

    const controller = new DemoDialogController(href, this.origin, options);

    return load.then(() => controller);
  }

  public enableRecord(): Promise<void> {
    return this.loadRecorder().then((service) => service.enableRecord());
  }

  private loadRecorder(): Promise<IRecorderService> {
    if (!this.recorderServiceDelegate) {
      const endpoint = this.options.endpoint || 'https://s.dwimg.top/sdk/v1/index.js';
      this.recorderServiceDelegate = import(/* @vite-ignore */ endpoint)
        .then((module) => {
          const { userInfo, ...otherOptions } = this.options;

          return module.initialize({ ...otherOptions, attributes: { userInfo: userInfo } as ISDKAttributes });
        })
        .then(
          (service) => {
            this.recorderServiceDelegate = service;
            return service;
          },
          (error) => {
            console.error(error);
            this.recorderServiceDelegate = null;
          },
        );
    }
    return this.recorderServiceDelegate;
  }
}
