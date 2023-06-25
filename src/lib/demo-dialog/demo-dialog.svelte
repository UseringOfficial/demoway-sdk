<script lang="ts">
  import { resize } from '../utils/resize';
  import { DOMAIN } from '../constants';

  export let demoId: string = '';

  let src: string = '';
  $: src = `${DOMAIN}/demo/${demoId}`;

  let width = 0;
  let height = 0;

  function onResize(rect: DOMRect): void {
    width = rect.width;
    height = rect.height;
  }
</script>

<div class="demo-dialog-overlay">
  <div class="demo-dialog-container" use:resize="{onResize}">
    <iframe width="{width}" height="{height}" src="{src}"></iframe>
    <button class="demo-dialog-close"></button>
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
    }

    &-container {
      width: 80%;
      height: 80%;
      overflow: visible;
      position: relative;
    }

    &-close {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      border-color: transparent;
      cursor: pointer;
    }
  }
</style>
