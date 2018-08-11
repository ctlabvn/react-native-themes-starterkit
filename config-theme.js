import { StyleSheet } from 'react-native';
import { heights, minHeights, maxHeights } from './styles/heights';
import { widths, minWidths, maxWidths } from './styles/widths';
import * as borders from './styles/borders';
import flexbox from './styles/flexbox';
import spacing from './styles/spacing';
import typeScale from './styles/typeScale';
import text from './styles/text';
import images from './styles/images';
import fontWeights from './styles/fontWeights';
import opacity from './styles/opacity';
import { tops, rights, bottoms, lefts } from './styles/absolute';
import lineHeight from './styles/lineHeight';
import tracked from './styles/tracked';
import { options, build } from './themes';

const DEFAULT_OPTIONS = {
  remScaled: [
    heights,
    minHeights,
    maxHeights,
    widths,
    minWidths,
    maxWidths,
    spacing,
    typeScale,
    borders.radii,
    lineHeight,
    tracked,
    tops,
    rights,
    bottoms,
    lefts
  ],
  /* fontRem parameter is optional to allow adjustment in font-scaling. default falls back to rem */
  fontRem: 20,
  colors: {
    transparent: 'transparent',
    white: '#FFFFFF',
    primary: '#EEEEEE',
    dark: '#212121',
    blue: '#165690',
    slightLightBlue: '#1f76c7',
    red: '#EA0029',
    superLightRed: '#ffccd5',
    lightRed: '#ff6682',
    gray: '#ccc',
    boldGray: '#a6a6a6',
    lightGray: '#e6e6e6',
    extremeLightRed: '#ffe6ea',
    lightBlue: '#0099ff',
    superLightGray: '#f2f2f2',
    backdrop: '#00000080',
    green: '#219B2A',
    yellow: '#F8B84A',
    extremeLightYellow: '#FFF8E7',
    darkGray: '#999999',
    boldGreen: '#3C7429',
    orange: '#FB9738',
    extremeBlue: '#1A4F5A',
    purple: '#6754A3'
  },
  styles: [
    borders.styles,
    flexbox,
    fontWeights,
    images,
    text,
    opacity,
    // custom styles => should put into seperated files
    {
      // this is optional, so it is removed from styles/absolute.js
      absolute_fill: StyleSheet.absoluteFillObject,
      light: {
        backgroundColor: '#FFFFFF'
      },
      dark: {
        backgroundColor: '#212121'
      },
      title: {
        fontSize: 14,
        color: '#000'
      },
      subtitle: {
        fontSize: 12,
        color: '#999'
      },
      underline: {
        textDecorationLine: 'underline'
      },
      textInputBorderBottom: {
        borderBottomColor: '#ccc'
      },
      textInput: {
        color: '#7e7e7e'
      },
      fullView: {
        width: '100%',
        height: '100%'
      },
      fullWidth: {
        width: '100%'
      },
      fullheight: {
        height: '100%'
      },
      topicText: {
        fontSize: options.rem * 0.75
      },
      dateNotificationText: {
        fontSize: options.rem * 0.7
      },
      notificationNumberText: {
        fontSize: options.rem * 0.5
      }
    }
  ],
  fn: {
    myStyle(color) {
      const ret = options.fn.bg.call(this, color);
      if (this.type.name !== 'View') {
        ret.color = color;
      }

      return ret;
    },
    flexFn: flex => ({
      flex: Number(flex)
    }),
    colorTextFn: color => ({
      color
    }),
    circleFn: size => {
      const height = Number(size);
      const width = height;
      const borderRadius = height / 2;
      return {
        height,
        width,
        borderRadius
      };
    },
    squareFn: size => {
      const height = Number(size);
      const width = height;
      return {
        height,
        width
      };
    },
    zIndexFn: zIndex => ({
      zIndex: Number(zIndex)
    }),
    widthPercentageFn: width => ({
      width: `${width}%`
    })
  }
};

export const buildTheme = (updatedOptions = DEFAULT_OPTIONS) =>
  build(updatedOptions, StyleSheet);
