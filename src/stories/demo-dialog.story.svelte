<script>
  import { initialize, openDemoDialog } from '../index';

  export let Hst;

  const appId = import.meta.env.VITE_APP_ID;
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  /**
   * @type {'cn' | 'global'}
   */
  let region = 'global';
  let demoId = '';

  function onClick() {
    initialize({
      accessToken,
      appId,
      region,
    });
    openDemoDialog(demoId);
  }
</script>

<svelte:component this="{Hst.Story}" title="DemoDialog">
  <input bind:value="{demoId}" />
  <select name="region" bind:value="{region}">
    <option value="global">Global</option>
    <option value="cn">CN</option>
  </select>
  <button on:click="{onClick}">Open</button>
</svelte:component>
