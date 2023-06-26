<script lang="ts">
  import './examples/button.css';
  import type { IDemoDialog } from '../lib/demo-dialog';
  import { openDemoDialog } from '../lib/demo-dialog';

  /**
   * Is this the principal call to action on the page?
   */
  export let primary = false;

  /**
   * What background color to use
   */
  export let backgroundColor: string | undefined = undefined;
  /**
   * How large should the button be?
   */
  export let size: 'small' | 'medium' | 'large' = 'medium';
  /**
   * Button contents
   */
  export let label: string = '';

  $: mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

  $: style = backgroundColor ? `background-color: ${backgroundColor}` : '';

  let dialog: IDemoDialog | null = null;

  function onClick(): void {
    dialog = openDemoDialog('clhrpul330005oq01vh85dfx9');
  }

  function onClose(): void {
    dialog?.close();
    dialog = null;
  }
</script>

<button
  type="button"
  class="{['storybook-button', `storybook-button--${size}`, mode].join(' ')}"
  style="{style}"
  on:click="{onClick}"
>
  {label}
</button>

<button
  type="button"
  class="{['storybook-button', `storybook-button--${size}`, mode].join(' ')}"
  style="{style}"
  on:click="{onClose}"
>
  close
</button>
