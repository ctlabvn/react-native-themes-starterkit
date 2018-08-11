import { mapValue } from '../utils';

const scale = {
  tracked: 0.1,
  'tracked-tight': -0.05,
  'tracked-mega': 0.25
};

export default mapValue(scale, val => ({ letterSpacing: val }));
