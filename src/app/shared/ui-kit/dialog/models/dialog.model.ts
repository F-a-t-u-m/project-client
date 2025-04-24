import { ButtonSeverity } from "primeng/button";

export interface DialogConfig {
  buttons: ButtonConfig[];
}

export interface ButtonConfig {
  label: string;
  action: ButtonAction;
  severity?: ButtonSeverity;
  color?: string;
  size?: string;
}

export enum ButtonAction {
  Confirm = 'confirm',
  Cancel = 'cancel',
}
