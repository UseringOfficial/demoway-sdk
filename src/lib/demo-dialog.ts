export interface IDemoDialogOptions {
  zIndex?: number;
  checklistId?: string;
}

export interface IDemoDialog {
  demoId: string | null;
  close(): void;
}
