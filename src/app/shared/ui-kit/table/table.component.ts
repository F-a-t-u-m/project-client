import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TableConfig } from './models/table.model';
import { DynamicPipe } from '../../pipes/dynamic.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, DynamicPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  public readonly data = input.required<any[]>();
  public readonly config = input.required<TableConfig>();
}
