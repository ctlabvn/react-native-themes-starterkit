import { mapValue } from '../utils';

const scale = {
  'lh-solid': 1,
  'lh-title': 1.25,
  'lh-copy': 1.5
};
export default mapValue(scale, val => ({ lineHeight: val }));
