import { setToken } from './lib/access-token';

export * from './lib/constants';
export * from './lib/connection';
import './lib/host.svelte';

export interface ISDKInitializeOptions {
  accessToken: string;
}

export function initialize({ accessToken }: ISDKInitializeOptions): () => void {
  setToken(accessToken);

  const host = document.createElement('miaolu-sdk-host');
  document.body.appendChild(host);

  return () => {
    document.body.removeChild(host);
  };
}
