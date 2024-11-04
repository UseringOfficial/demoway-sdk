import type { Action } from 'svelte/action';

export const resize: Action<HTMLElement, (rect: DOMRect) => void> = (node, parameter: (rect: DOMRect) => void) => {
  const resizeObserver = new ResizeObserver(() => {
    const rect = node.getBoundingClientRect();
    parameter?.(rect);
  });

  resizeObserver.observe(node);

  return {
    destroy() {
      resizeObserver.disconnect();
    },
  };
};
