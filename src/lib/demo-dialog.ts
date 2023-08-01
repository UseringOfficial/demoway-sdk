export interface IDemoDialogOptions {
  zIndex?: number;
}

export interface IDemoDialog {
  demoId: string | null;
  close(): void;
}
