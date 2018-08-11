import { mapValue } from '../utils';

export const tops = mapValue(
  {
    'top-0': 0,
    'top-1': 1,
    'top-2': 2
  },
  val => ({ top: val })
);

export const rights = mapValue(
  {
    'right-0': 0,
    'right-1': 1,
    'right-2': 2
  },
  val => ({ right: val })
);

export const bottoms = mapValue(
  {
    'bottom-0': 0,
    'bottom-1': 1,
    'bottom-2': 2
  },
  val => ({ bottom: val })
);

export const lefts = mapValue(
  {
    'left-0': 0,
    'left-1': 1,
    'left-2': 2
  },
  val => ({ left: val })
);
