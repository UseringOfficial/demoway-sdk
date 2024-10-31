import { bufferCount, filter, firstValueFrom, fromEvent, map, noop } from 'rxjs';
import type { ISDKService } from './lib/service-host';
import { ServiceHost } from './lib/service-host';
import { ServiceImpl } from './lib/service-impl';
import type { ISDKInitializeOptions } from './lib/types';

export * from './lib/types';
export type { ISDKService };

import 'virtual:uno.css';

function errorNotInitialized(): never {
  throw new Error('sdk is not initialized');
}

const dummySDKService: ISDKService = {
  openDemoDialog: errorNotInitialized,
  enableRecord: errorNotInitialized,
  getDemoUrl: errorNotInitialized,
};

const serviceHost = new ServiceHost(dummySDKService);

const { openDemoDialog, enableRecord, getDemoUrl } = serviceHost;

export { openDemoDialog, enableRecord, getDemoUrl };

export function initialize(options: ISDKInitializeOptions): Promise<ISDKService> {
  if (!options.accessToken) {
    throw new Error('Invalid token');
  }

  if (!options.appId) {
    throw new Error('Missing appId');
  }

  serviceHost.initialize(new ServiceImpl(options));

  return Promise.resolve(serviceHost);
}

export function rageClick(element: HTMLElement, count: number, timeLimit: number): Promise<void> {
  return firstValueFrom(
    fromEvent(element, 'click').pipe(
      map(() => Date.now()),
      bufferCount(count),
      filter((list) => list[list.length - 1] - list[0] < timeLimit),
      map(noop),
    ),
  );
}
