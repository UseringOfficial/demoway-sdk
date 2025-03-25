import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ISDKInitializeOptions } from './types';

export function normalizeOrigin(options: ISDKInitializeOptions) {
  if (options.origin) {
    return options.origin;
  }
  switch (options.region) {
    case 'cn':
      return 'https://app.demoway.cn';
    case 'global':
    default:
      return 'https://app.demoway.com';
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
