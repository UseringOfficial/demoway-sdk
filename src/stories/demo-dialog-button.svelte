<script lang="ts">
  import { initialize, openDemoDialog } from '../index';

  interface Props {
    appId: string;
    accessToken: string;
  }

  let { accessToken, appId }: Props = $props();

  let demoId = $state('');
  let region: 'global' | 'cn' = $state('global');

  function onClick() {
    console.log({
      accessToken,
      appId
    })
    initialize({
      accessToken,
      appId,
      region,
    });
    openDemoDialog(demoId);
  }
</script>

<input bind:value="{demoId}" />
<select name="region" bind:value="{region}">
  <option value="global">Global</option>
  <option value="cn">CN</option>
</select>
<button onclick="{onClick}">Open</button>
