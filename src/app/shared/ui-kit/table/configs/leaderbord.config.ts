import { TruncateAddressPipe } from '../../../pipes/truncate-address.pipe';
import { TableConfig } from '../models/table.model';

export const LEADERBOARD_TABLE_CONFIG: TableConfig = {
  headers: [{ label: 'Place' }, { label: 'Address' }, { label: 'Points' }],
  content: [
    {
      label: 'rowIndex',
      labelFormat: (value: number) => value + 1,
    },
    {
      label: 'address',
      labelFormat: (value: string) => value,
      pipe: TruncateAddressPipe,
    },
    {
      label: 'score',
      labelFormat: (value: number) => value,
    },
  ],
};
