import { mapValue } from '../utils';

export const scale = {
  'f-headline': 6,
  'f-subheadline': 5,
  f1: 3,
  f2: 2.25,
  f3: 1.5,
  f4: 1.25,
  f5: 1,
  f6: 0.875,
  f7: 0.8,
  f8: 0.75,
  f9: 0.7,
  f10: 0.65,
  f11: 0.6,
  f12: 0.5
};

export default mapValue(scale, val => ({ fontSize: val }));
