import { bufferCount, filter, firstValueFrom, fromEvent, map, noop } from 'rxjs';
import type { ISDKService } from './lib/service-host';
import { ServiceHost } from './lib/service-host';

export * from './lib/demo-dialog';
export type { ISDKService };

export interface ISDKInitializeOptions {
  accessToken: string;
}

function readLocalStorage(key: string): string | null {
  return typeof localStorage === 'object' ? localStorage.getItem(key) : null;
}

const SERVICE_ENDPOINT_KEY = 'MIAOLU_SERVICE_ENDPOINT';
export const SERVICE_ENDPOINT = readLocalStorage(SERVICE_ENDPOINT_KEY) || `//s.demoway.co/sdk/sdk-service/index.js`;

function errorNotInitialized(): never {
  throw new Error('sdk is not initialized');
}

const serviceHost = new ServiceHost(
  Promise.resolve<ISDKService>({
    openDemoDialog: errorNotInitialized,
    enableRecord: errorNotInitialized,
  })
);

export const openDemoDialog = serviceHost.openDemoDialog;
export const enableRecord = serviceHost.enableRecord;

export function initialize({ accessToken }: ISDKInitializeOptions): Promise<ISDKService> {
  if (!accessToken) {
    throw new Error('Invalid token');
  }

  const url = SERVICE_ENDPOINT.startsWith('http') ? SERVICE_ENDPOINT : `${location.protocol}${SERVICE_ENDPOINT}`;
  const promise = import(new URL(url).toString()).then((module) => module.initialize(accessToken));
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
