import { bufferCount, filter, firstValueFrom, fromEvent, map, noop } from 'rxjs';
import type { ISDKService } from './lib/service-host';
import { ServiceHost } from './lib/service-host';

export * from './lib/demo-dialog';
export type { ISDKService };

const SESSION_STORAGE_KEY = 'DEMOWAY_SDK_INITIALIZED';
const INITIALIZE_EVENT_KEY = 'demoway-sdk-initialize';

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

if (typeof sessionStorage === 'object') {
  sessionStorage.setItem(SESSION_STORAGE_KEY, 'false');
}

export function initialize(options: ISDKInitializeOptions): Promise<ISDKService> {
  if (!options.accessToken) {
    throw new Error('Invalid token');
  }

  if (serviceHost.delegate !== dummySDKService) {
    return serviceHost.delegate.then(() => serviceHost);
  }

  if (sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true') {
    throw new Error('Multiple sdk detected');
  }

  const promise = import(SERVICE_ENDPOINT).then((module) => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    window.dispatchEvent(new CustomEvent(INITIALIZE_EVENT_KEY));
    return module.initialize(options);
  });
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
