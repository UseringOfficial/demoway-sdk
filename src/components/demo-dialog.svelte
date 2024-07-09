<svelte:options customElement="demoway-demo-dialog" accessors />

<script lang="ts">
  import { filter, firstValueFrom, fromEvent } from 'rxjs';
  import { createEventDispatcher } from 'svelte';
  import { DEMOWAY_DEMO_DIALOG_CLOSE } from '../lib/constants';
  import type { ISDKInitializeOptions } from '../lib/types';
  import { normalizeOrigin } from '../lib/utils';
  import { resize } from './resize.action';

  export let demoId: string;
  export let checklistId: string | undefined;
  export let zIndex: number | undefined;
  export let options: ISDKInitializeOptions;

  const dispatch = createEventDispatcher<{
    close: void;
  }>();

  const origin = normalizeOrigin(options);

  const url = new URL(`/demo/${demoId}`, origin);
  url.searchParams.set('browser', String(true));
  url.searchParams.set('scaleDown', String(false));
  url.searchParams.set('scale', String(100));
  url.searchParams.set('client', 'sdk');
  url.searchParams.set('token', options.accessToken);

  $: {
    if (checklistId) {
      url.searchParams.set('checklistId', checklistId);
    } else {
      url.searchParams.delete('checklistId');
    }
    src = url.href;
  }

  let src = url.href;

  let width = 0;
  let height = 0;

  function onResize(rect: DOMRect): void {
    width = rect.width;
    height = rect.height;
  }

  function onClose(): void {
    dispatch('close');
  }

  function onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Esc') {
      onClose();
    }
  }

  firstValueFrom(
    fromEvent<MessageEvent>(window, 'message').pipe(
      filter((e) => {
        return e.origin === url.origin && e.data?.type === DEMOWAY_DEMO_DIALOG_CLOSE;
      })
    )
  ).then(() => {
    onClose();
  });
</script>

<div
  class="demo-dialog-overlay"
  role="button"
  tabindex="-1"
  style:z-index="{zIndex ?? 10000}"
  on:click="{onClose}"
  on:keydown="{onKeyDown}"
>
  <div class="demo-dialog-container" use:resize="{onResize}">
    <iframe
      class="demo-dialog-content"
      width="{width}"
      height="{height}"
      title="demo"
      src="{src}"
      allowfullscreen
      allowtransparency="{true}"></iframe>
    <!--    <button class="demo-dialog-close" on:click="{onClose}"></button>-->
  </div>
</div>

<style lang="scss">
  :host {
    position: relative;
  }

  .demo-dialog {
    &-overlay {
      position: fixed;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
      background-color: rgb(255, 255, 255, 0.7);
    }

    &-container {
      width: 90%;
      height: 90%;
      overflow: hidden;
      position: relative;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 12px;
    }

    &-content {
      border: none;
    }
  }
</style>
