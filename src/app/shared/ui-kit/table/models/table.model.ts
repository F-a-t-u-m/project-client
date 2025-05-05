import { Pipe } from "@angular/core";

export interface TableConfig {
  headers: TableHeaderConfig[];
  content: TableContentConfig[];
}

export interface TableHeaderConfig {
  label: string;
}

export interface TableContentConfig {
  label: string;
  labelFormat: (value: any) => any;
  pipe?: Pipe;
}
