<svelte:options customElement="miaolu-sdk-host" accessors="{false}" />

<script lang="ts">
  import { INTERMEDIARY_ENDPOINT } from './constants';
  import { connectEndpoint } from './endpoint';

  let iframe: HTMLIFrameElement | undefined = undefined;

  const onLoad = () => {
    connectEndpoint(iframe);
  };
</script>

<iframe
  bind:this="{iframe}"
  class="intermediary"
  title="intermediary"
  width="480px"
  height="300px"
  allowtransparency="{true}"
  src="{INTERMEDIARY_ENDPOINT}"
  on:load="{onLoad}"></iframe>

<style>
  :host {
    display: flex;
    position: fixed;
    left: 20px;
    bottom: 20px;
    overflow: visible;
  }

  .intermediary {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0, -100%);
  }
</style>
