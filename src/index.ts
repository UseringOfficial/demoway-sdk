import { bufferCount, filter, firstValueFrom, fromEvent, map, noop } from 'rxjs';
import type { ISDKService } from './lib/service-host';
import { ServiceHost } from './lib/service-host';

export * from './lib/demo-dialog';
export type { ISDKService };

export interface ISDKInitializeOptions {
  accessToken: string;
  zIndex?: number;
}

function readLocalStorage(key: string): string | null {
  return typeof localStorage === 'object' ? localStorage.getItem(key) : null;
}

const SERVICE_ENDPOINT_KEY = 'MIAOLU_SERVICE_ENDPOINT';
export const SERVICE_ENDPOINT =
  readLocalStorage(SERVICE_ENDPOINT_KEY) || `https://s.demoway.co/sdk/sdk-service/index.js`;

function errorNotInitialized(): never {
  throw new Error('sdk is not initialized');
}

const dummySDKService: Promise<ISDKService> = Promise.resolve({
  openDemoDialog: errorNotInitialized,
  enableRecord: errorNotInitialized,
});

const serviceHost = new ServiceHost(dummySDKService);

export const openDemoDialog = serviceHost.openDemoDialog;
export const enableRecord = serviceHost.enableRecord;

export function initialize(options: ISDKInitializeOptions): Promise<ISDKService> {
  if (!options.accessToken) {
    throw new Error('Invalid token');
  }

  if (serviceHost.delegate !== dummySDKService) {
    return serviceHost.delegate.then(() => serviceHost);
  }

  const promise = import(SERVICE_ENDPOINT).then((module) => module.initialize(options));
  serviceHost.delegate = promise;

  return promise.then(() => serviceHost);
}

export function rageClick(element: HTMLElement, count: number, timeLimit: number): Promise<void> {
  return firstValueFrom(
    fromEvent(element, 'click').pipe(
      map(() => Date.now()),
      bufferCount(count),
      filter((list) => list[list.length - 1] - list[0] < timeLimit),
      map(noop)
    )
  );
}
