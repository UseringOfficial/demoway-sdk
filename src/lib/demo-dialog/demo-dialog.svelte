<svelte:options accessors />

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { resize } from '../utils/resize';
  import { DOMAIN } from '../constants';

  const eventDispatcher = createEventDispatcher<{
    close: void;
  }>();

  export let demoId: string = '';

  let src: string = '';
  $: src = `${DOMAIN}/demo/${demoId}`;

  let width = 0;
  let height = 0;

  function onResize(rect: DOMRect): void {
    width = rect.width;
    height = rect.height;
  }

  function onClose(): void {
    eventDispatcher('close', undefined);
  }
</script>

<div class="demo-dialog-overlay" on:click="{onClose}">
  <div class="demo-dialog-container" use:resize="{onResize}">
    <iframe class="demo-dialog-content" width="{width}" height="{height}" title="demo" src="{src}" allowfullscreen
    ></iframe>
    <button class="demo-dialog-close" on:click="{onClose}"></button>
  </div>
</div>

<style lang="scss">
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
      background-color: rgb(0, 0, 0, 0.5);
    }

    &-container {
      width: 80%;
      height: 80%;
      overflow: visible;
      position: relative;
    }

    &-content {
      border: none;
    }

    &-close {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      border: none;
      cursor: pointer;
      background-color: #333;
    }
  }
</style>
