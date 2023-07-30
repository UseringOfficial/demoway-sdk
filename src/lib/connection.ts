import { filter, firstValueFrom, fromEvent, map, Observable, share, Subject, Subscription } from 'rxjs';

export interface IConnection<S, R> {
  readonly send$: Subject<S>;
  readonly receive$: Observable<R>;
  send(message: S): void;
  dispose(): void;
}

class Connection<S, R> implements IConnection<S, R> {
  public readonly send$: Subject<S>;
  public readonly receive$: Observable<R>;
  public readonly receiveRaw$: Subject<MessageEvent>;
  private readonly $$: Subscription[] = [];

  constructor(private readonly port: MessagePort) {
    const receiveRaw$ = new Subject<MessageEvent<R>>();
    port.onmessage = receiveRaw$.next.bind(receiveRaw$);
    this.receiveRaw$ = receiveRaw$;

    const send$ = new Subject<S>();
    this.$$.push(
      send$.subscribe((message) => {
        port.postMessage(message);
      })
    );

    const receive$ = receiveRaw$.pipe(
      map((e) => e.data),
      share()
    );

    this.send$ = send$;
    this.receive$ = receive$;
  }

  public send(message: S): void {
    this.send$.next(message);
  }

  public dispose(): void {
    this.$$.forEach(($) => {
      $.unsubscribe();
    });
    this.port.onmessage = null;
    this.port.close();
  }
}

export async function connect<S, R>(target: Window | WindowProxy, magic: string): Promise<IConnection<S, R>> {
  const channel = new MessageChannel();
  const connection = new Connection<S, R>(channel.port1);
  const wait = firstValueFrom(connection.receiveRaw$.pipe(filter((e) => e.data === magic)));
  target.postMessage(magic, '*', [channel.port2]);
  await wait;
  return connection;
}

export async function listen<S, R>(target: Window | WindowProxy, magic: string): Promise<IConnection<S, R>> {
  const event = await firstValueFrom(
    fromEvent<MessageEvent>(target, 'message').pipe(filter((e) => e.data === magic && e.ports.length > 0))
  );
  const port = event.ports[0];
  const connection = new Connection<S, R>(port);
  port.postMessage(magic);
  return connection;
}
