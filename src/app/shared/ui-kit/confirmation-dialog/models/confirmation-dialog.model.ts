import { ButtonAction, DialogConfig } from "../../dialog/models/dialog.model";

export interface ConfirmationDialogConfig extends DialogConfig {
  body: BodyBlock[];
}

export interface BodyBlock {
  rows: BodyRow[];
}

export interface BodyRow {
  content: string;
  fontSize: number;
  color: string;
}

export const DefaultConfirmationDialogConfig: ConfirmationDialogConfig = {
  body: [
    {
      rows: [
        { content: 'Ready to join game?', fontSize: 14, color: '#fff' },
        { content: '↑→↓←', fontSize: 14, color: '#fff' }
      ]
    },
    {
      rows: [
        { content: 'Enter fee:', fontSize: 14, color: '#fff' },
        { content: '1 ETH', fontSize: 14, color: '#fff' }
      ]
    },
  ],
  buttons: [
    { label: 'Start', action: ButtonAction.Confirm },
    { label: 'Cancel', action: ButtonAction.Cancel },
  ],
};
