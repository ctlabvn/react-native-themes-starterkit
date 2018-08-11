const REM_SCALE = [0, 0.25, 0.5, 1, 2, 4, 8, 16, 32];

const what = {
  m: 'margin',
  p: 'padding'
};
const where = {
  a: '',
  h: 'Horizontal',
  v: 'Vertical',
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left'
};

const style = {};
for (let whatShort in what) {
  const whatLong = what[whatShort];
  for (let whereShort in where) {
    const whereLong = where[whereShort];
    REM_SCALE.forEach((scale, idx) => {
      style[`${whatShort}${whereShort}${idx}`] = {
        [`${whatLong}${whereLong}`]: scale
      };
    });
  }
}

export default style;
