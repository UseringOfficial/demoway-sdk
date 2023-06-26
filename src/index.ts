import { setToken } from './lib/access-token';

export * from './lib/demo-dialog';

export interface ISDKInitializeOptions {
  accessToken: string;
}

export function initialize({ accessToken }: ISDKInitializeOptions): void {
  setToken(accessToken);
}
