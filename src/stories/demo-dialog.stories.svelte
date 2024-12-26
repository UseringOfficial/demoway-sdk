<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Page from './demo-dialog-button.svelte';

  const appId = import.meta.env.VITE_APP_ID;
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
console.log({
  appId,
  accessToken
})
  const { Story } = defineMeta({
    title: 'Demo Dialog',
    component: Page,
    parameters: {
      // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
      layout: 'fullscreen',
    },
  });
</script>

<Story name="DemoDialog" args="{{ appId, accessToken }}" />
