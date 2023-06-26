import type { Meta, StoryObj } from '@storybook/svelte';
import { initialize } from '../index';
import Button from './demo-dialog-button.svelte';

initialize({
  accessToken: 'token',
});

const meta = {
  title: 'Demoway/DemoDialog',
  component: Button,
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenDemoDialog: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
