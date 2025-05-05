import { TruncateAddressPipe } from '../../../pipes/truncate-address.pipe';
import { TableConfig } from '../models/table.model';

export const MY_SCORE_CONFIG: TableConfig = {
  headers: [{ label: 'Place' }, { label: 'Address' }, { label: 'Points' }],
  content: [
    {
      label: 'place',
      labelFormat: (value: number) => value,
    },
    {
      label: 'address',
      labelFormat: (value: string) => value,
      pipe: TruncateAddressPipe,
    },
    {
      label: 'points',
      labelFormat: (value: number) => value,
    },
  ],
};
