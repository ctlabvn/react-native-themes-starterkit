export const hyphensToUnderscores = sourceObj => {
  const translated = {};

  /* Create hypened versions */
  for (let key in sourceObj) {
    translated[key.replace(/-/g, '_')] = sourceObj[key];
  }

  return translated;
};

// this method support to merge object only, if you put an array to a key, it will crash
export const merge = (target, source) => {
  // if source is reference, we should think about return new cloned object
  if (target === undefined) return source;

  // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
  for (let key in source) {
    // function instanceOf Object === true, so do not use that
    if (typeof source[key] === 'object')
      Object.assign(source[key], merge(target[key], source[key]));
  }

  // Join `target` and modified `source`
  return Object.assign(target, source);
};
