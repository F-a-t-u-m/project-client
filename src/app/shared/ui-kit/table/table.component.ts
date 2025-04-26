import { Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PLAYERS_MOCK } from '../../mocks/players.mock';
import { TruncateAddressPipe } from '../../pipes/truncate-address.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, TruncateAddressPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  public readonly items = input<any>(PLAYERS_MOCK);
}
