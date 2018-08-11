import { mapValue } from '../utils';

export const widths = mapValue(
  {
    w1: 1,
    w2: 2,
    w3: 4,
    w4: 8,
    w5: 16,
    w6: 32
  },
  val => ({ width: val })
);

export const maxWidths = mapValue(
  {
    'max-w1': 1,
    'max-w2': 2,
    'max-w3': 4,
    'max-w4': 8,
    'max-w5': 16,
    'max-w6': 32
  },
  val => ({ maxWidth: val })
);

export const minWidths = mapValue(
  {
    'min-w1': 1,
    'min-w2': 2,
    'min-w3': 4,
    'min-w4': 8,
    'min-w5': 16,
    'min-w6': 32
  },
  val => ({ minWidth: val })
);
