# React Native Theme System

## Overview

React Native Theme System brings functional styling to react-native. It is inspired by [Tachyons](http://tachyons.io) and uses it's scales and naming convention. [More about the advantages of this approach](http://mrmrs.github.io/writing/2016/03/24/scalable-css).

![Demo](demo.png 'Demo')

Let's see how tachyons compares to traditional styling:

##### 1. Traditional `react-native` style:

```
import {StyleSheet} from "react-native";

const s = StyleSheet.create({
  view: {
    borderWidth: 1,
    justifyContent: "flex-start",
    padding: MAGIC_PIXEL_VALUE
  },
  text: {
    color: "white",
    textAlign: "center"
  }
})

<View style={[s.view]}
   <Text style={[s.text]}>Something</Text>
</View>
```

##### 2. Improved with `theme-system`:

```
<View cls="ba jcfs pa2">                 /* string is checked for validity */
   <Text cls="white tc">
       Something
   </Text>
</View>
```

#### Advantages

- Less code
- No need to maintain a separate stylesheet
- No need to find a proper name for every component you want to style
- Looking at a component tells you exactly how it looks, it's all in one place.
- Flexible syntax because cls can take any number of arguments which can be string, object or array.

```
cls={['foo', 'bar']} // => 'foo bar'
cls={['foo', { bar: true }]} // => 'foo bar'
cls={{ 'foo-bar': true }} // => 'foo-bar'
cls={{ 'foo-bar': false }} // => ''
cls={[{ foo: true }, { bar: true }]} // => 'foo bar'
cls={{ foo: true, bar: true }} // => 'foo bar'

// lots of arguments of various types
cls={['foo', { bar: true, duck: false }, 'baz', { quux: true }]} // => 'foo bar baz quux'

// other falsy values are just ignored
cls={[null, false, 'bar', undefined, 0, 1, { baz: null }, '']} // => 'bar 1'
```

Arrays will be recursively flattened as per the rules above:

```
var arr = ['b', { c: true, d: false }];
cls={['a', arr]} // => 'a b c'
```

#### Tachyons' scale

- Dimensions and typography build on a proven scale, which is relative to `rem`, the root font-size. Instead of having to find proper values for padding (or margin, width or height), you use a simple 7-step scale. `pa2` gets you `padding` of `0.5rem`.

- The scale progresses with powers of two, so each step is twice as big as the last. This means everything will always line up, no more "off-by-one-pixel"-problems.

- You can scale the entire design just by setting a different `rem`. This is a great advantage when building a responsive app.

  [More about Tachyons' spacing](http://tachyons.io/docs/layout/spacing/)

  [More about Tachyons' typography](http://tachyons.io/docs/typography/scale/)

- The optional `fontRem` parameter scales the font sizes independently of other styles.

## Usage

1.  In the entry point of your app include:

```
import { StyleSheet } from "react-native";
import { buildTheme } from "./config-theme";

buildTheme({
    clsPropName: "cls",
    /* default is cap of clsPropName, propCls => propStyle */
    clsPropNameCap: "Cls",
    clsMap: {
       cls: "style",
       contentContainerCls: "contentContainerStyle",
       containerCls: "containerStyle",
       wrapperCls: "wrapperStyle"
    },

    /* REM parameter is optional, default is 16 */
    rem: screenWidth > 340 ? 18 : 16,
    /* fontRem parameter is optional to allow adjustment in font-scaling. default falls back to rem */
    fontRem: 20
});
```

##### Sensible rem/fontRem values

Experience with variously sized iPhone and Android phones from 4" to 6" displays showed,
that for tablets, rem values in the range of 12 - 18, depending on device resolution, work well.
For phones, the same rem can be used, but fontRem should be floored at 14, to keep everything readable.

2.  To use the `cls=''` syntax, you have to wrap your component:

```
import { wrap } from "./theme";

@wrap
class MyComponent extends React.Component {
...
```

_or if you use simple functions_

`wrap(() => <Text cls="b">Hi there!</Text>)`

```
If you prefer to use a different propName instead of `cls`, specify the name in the options:
```

```
buildTheme({
  clsPropName: "cls"
});
```

## Reference / Supported Properties

##### FlexBox

```
absolute               position: "absolute"                 /* default: "relative" */
flx-i                  flex: 1
flx-row                flexDirection: "row"                 /* default: "column" */
flx-row-reverse        flexDirection: "row-reverse"
flx-col-reverse        flexDirection: "column-reverse"
flx-wrap               flexWrap: "wrap"                     /* default: "nowrap" */
aifs                   alignItems: "flex-start"             /* default: "stretch" */
aic                    alignItems: "center"
aife                   alignItems: "flex-end"
jcc                    justifyContent: "center"             /* default: "flex-start" */
jcfe                   justifyContent: "flex-end"
jcsb                   justifyContent: "space-between"
jcsa                   justifyContent: "space-around"
asfs                   alignSelf: "flex-start"
asfe                   alignSelf: "flex-end"
asc                    alignSelf: "center"
ass                    alignSelf: "stretch"
```

##### Margins & Paddings [(Scale)](http://tachyons.io/docs/layout/spacing/)

```
ma0 ... ma8            margin: 0|0.25|0.5|1|2|4|8|16|32 rem
ml|mr|mb|mt [0-8]      marginLeft, marginRight, marginBottom, marginTop
mh [0-8]               marginHorizontal
mv [0-8]               marginVertical

/* Same with p for padding */
```

##### Heights & Widths

```
h1 ... h6              height: 1|2|4|8|16|32 rem
w1 ... w6              width: 1|2|4|8|16|32 rem

min-h1 ... min-h6      minHeight: 1|2|4|8|16|32 rem
max-h1 ... max-h6      maxHeight: 1|2|4|8|16|32 rem
```

##### Absolute

```
absolute                     position: absolute
top|right|bottom|left-0      top|right|bottom|left: 0 rem
                  ... 1                         ... 1 rem
                  ... 2                         ... 2 rem

absolute-fill                position: absolute, top/left/right/bottom: 0
```

##### Borders

```
ba                     borderWidth: 1
bl|br|bt|bb            borderLeftWidth: 1 | borderRightWidth: 1...

br0 ... br5            borderRadius: 0|0.125|0.25|0.5|1]2 rem
br--bottom             bottom radius only
br--top                top radius only
br--right              right radius only
br--left               left radius only
```

##### Text & Fonts [(Scale)](http://tachyons.io/docs/typography/scale/)

```
f5                     fontSize: 1 rem
f1 ... f6              fontSize: 3|2.25|1.5|1.25|1|0.875 rem
f-headline             fontSize: 6 rem
f-subheadline          fontSize: 5 rem

normal                 fontWeight: normal
b                      fontWeight: bold
fw1 ... fw9            fontWeight: 100 ... fontWeight: 900

i                      fontStyle: italic

tl|tc|tr|tj            textAlign: left|center|right|justify

lh-solid               lineHeight: 1 rem
lh-title               lineHeight: 1.25 rem
lh-copy                lineHeight: 1.5 rem

/* Letter-spacing is only supported on iOS */
tracked                letterSpacing:  0.1 rem
tracked-tight          letterSpacing: -0.05 rem
tracked-mega           letterSpacing:  0.25 rem
```

##### Font-Families

Specify the font-families you need in the configuration to use them:

```
ff-iowan               fontFamily: "Iowan Old Style"

/* setup: */

buildTheme({
  fonts: {
    iowan: 'Iowan Old Style'
  }
});
```

##### Images

```
rm-contain             resizeMode: "contain"
rm-cover               resizeMode: "cover"
rm-stretch             resizeMode: "stretch"

tint-$color            tintColor: $color, see Colors section
```

##### Opacity

```
o-10|20|...|100        opacity: 0.1|0.2|...|1
o-05                   opacity: 0.05
o-025                  opacity: 0.025
```

## Colors

- When using the `cls=''` syntax, colors can be specified directly in the string. Every [Color](https://facebook.github.io/react-native/docs/colors.html) supported by react-native works. If the color is prefixed with `bg-` the `backgroundColor` will be set. A prefix of `b--` sets the `borderColor`.

  ```
  bg-green                     green background
  #232323                      text color of #232323
  b--rgba(255,255,255,0.5)     border set to rgba(255,255,255,0.5)
  tint-blue                    tint-color set to blue
  ```

- You can also specify a palette in the options and Tachyons will generate styles for you. It will also generate variants with different opacities.

  ```
  buildTheme({
     colors: {
        green: "#00FF00",
     }
  });
  ```

  The same syntax with `bg-` for background and `b--` for borderColor applies.

  ```
  bg-green                green background
  b--green                green border        // Note: double hyphens signify a class that needs
  green                   green text          // another class to work in this case a border-setting

  /* alpha variants (same for bg- and b--) */
  green-10, green-20 ... green-90       green text with 10%, 20%, ... , 90% alpha
  ```

## Raw Values

To access the actual computed sizes:

```
import { options, sizes } from "./themes"

const s = options.rem * sizes.ma2          /* sizes.w4, ... */
```

## Magic Functions

We can map cls attribute to defined function:

```
import { options } from ".themes"

buildTheme({
   fn: {
      myFn:(val)=>({
         green: "#00FF00",
      })
   }
});

<View cls="myFn-12">                 /* format is function-param1-param2 */
   ...
</View>
```
