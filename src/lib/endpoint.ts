import { BehaviorSubject } from 'rxjs';
import { connect } from './connection';
import type { IConnection } from './connection';
import { MAGIC } from './constants';

export const connection$ = new BehaviorSubject<IConnection<any, any> | undefined>(undefined);

export function connectEndpoint(iframe: HTMLIFrameElement | undefined): void {
  if (!iframe?.contentWindow) {
    return;
  }
  connect(iframe.contentWindow, MAGIC).then((connection) => {
    connection$.next(connection);
  });
}
