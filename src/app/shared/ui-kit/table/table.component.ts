import { Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TableConfig } from './models/table.model';
import { DynamicPipe } from '../../pipes/dynamic.pipe';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, DynamicPipe, JsonPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  public readonly data = input.required<any[]>();
  public readonly config = input.required<TableConfig>();
}
