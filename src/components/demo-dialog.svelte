<script lang="ts">
  import { DEMOWAY_DEMO_DIALOG_CLOSE } from '../lib/constants';
  import { cn } from '../lib/utils';
  import { resize } from './resize.action';

  interface Props {
    href: string;
    origin: string;
    class?: string;
    backdropClass?: string;
    close?(): void;
    [key: string]: unknown;
  }

  let { href, origin, class: className, backdropClass, close }: Props = $props();

  let width = $state(0);
  let height = $state(0);

  function onResize(rect: DOMRect): void {
    width = rect.width;
    height = rect.height;
  }

  function onClick(e: MouseEvent) {
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  }

  function onClose(): void {
    close?.();
  }

  function onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Esc') {
      onClose();
    }
  }

  function onMessage(e: MessageEvent): void {
    if (e.origin === origin && e.data?.type === DEMOWAY_DEMO_DIALOG_CLOSE) {
      onClose();
    }
  }
</script>

<svelte:window onmessage="{onMessage}" />

<div
  class="{cn('fixed w-screen h-screen flex items-center justify-center top-0 left-0 bg-background/80', backdropClass)}"
  role="button"
  tabindex="-1"
  onclick="{onClick}"
  onkeydown="{onKeyDown}"
>
  <div class="{cn('w-11/12 h-11/12 overflow-hidden rounded-xl', className)}" use:resize="{onResize}">
    <iframe class="border-none" {width} {height} title="demo" src="{href}" allowfullscreen allowtransparency="{true}"
    ></iframe>
  </div>
</div>
