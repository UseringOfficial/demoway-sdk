export interface IDemoDialogOptions {
  zIndex?: number;
  checklistId?: string;
}

export interface DemoDialogElement extends HTMLElement, IDemoDialogOptions {
  demoId: string;
  options: ISDKInitializeOptions;
}

declare global {
  interface HTMLElementTagNameMap {
    'demoway-demo-dialog': DemoDialogElement;
  }
}

export interface ISDKAttributes {
  userInfo?: IUserInfo;

  [key: string]: unknown;
}

export interface IUserInfo {
  openId?: string;
  userName?: string;
  nickName?: string;
  email?: string;
  company?: {
    id?: string;
    name: string;
  };

  [key: string]: unknown;
}

export interface ISDKInitializeOptions {
  appId: string;
  accessToken: string;
  zIndex?: number;
  userInfo?: IUserInfo;
  endpoint?: string;
  region?: 'cn' | 'global';
  locale?: string;
  origin?: string;
}

export interface IRecorderService {
  enableRecord(): Promise<void>;
}

export interface IDemoDialog {
  close(): void;
}