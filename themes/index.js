import React from 'react';
import classNames from 'classnames';

const hyphensToUnderscores = sourceObj => {
  const translated = {};

  /* Create hypened versions */
  for (let key in sourceObj) {
    translated[key.replace(/-/g, '_')] = sourceObj[key];
  }

  return translated;
};

// this method support to merge object only, if you put an array to a key, it will crash
const merge = (target, source) => {
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

// should not export styles so that all updates must go through build function
export const styles = {};

export const sizes = {};

// style functions
const bg = color => ({
  backgroundColor: color
});

const b_ = color => ({
  borderColor: color
});

const tint = color => ({
  tintColor: color
});

// fn should use this as React element instead of options.fn
// because it is not trivial to access this.otherMethod as well as we can access
// options.fn and other utils
export const options = {
  remScaled: [],
  rem: 16,
  colors: {},
  fonts: {},
  clsPropName: 'cls',
  // with clsMap, we do not have to loop all props and check endsWidth
  // not only faster but also allowing flexible mapping between cls and propName
  clsMap: {
    //   cls: "style",
    //   contentContainerCls: "contentContainerStyle",
    //   containerCls: "containerStyle",
    //   wrapperCls: "wrapperStyle"
  },
  styles: [],
  fn: {
    bg,
    b_,
    tint
  }
};

/**
 * @param {object} elementsTree - React component
 * @param {object|Array} targetProp - outlier styles (ex: style={{ width: '25%' paddingTop: 1 }})
 * @param {string|Array} prop - main styles
 * (ex: cls="pa2", cls={["pa2", {'bg-red': true}]}, contentContainerCls)
 *
 * @returns {Array} translatedStyle - Array of styles
 * (ex: [155, 166, Object({height: 1, width: '25%'})])
 */

const transformStyle = (elementsTree, targetProp, prop) => {
  let translatedStyle = null;
  let translatedProp;

  // parse Prop value to string
  if (prop !== undefined) {
    if (typeof prop === 'string') {
      translatedProp = prop;
    } else if (Array.isArray(prop)) {
      translatedProp = classNames(...prop);
    } else {
      // try to pass to classNames for the rest
      translatedProp = classNames(prop);
    }
  }

  /* Parse cls string */
  if (translatedProp) {
    if (Array.isArray(targetProp)) {
      translatedStyle = targetProp.slice();
    } else if (targetProp !== null && typeof targetProp === 'object') {
      translatedStyle = [targetProp];
    } else {
      translatedStyle = [];
    }

    const splitted = translatedProp.replace(/-/g, '_').split(' ');

    for (let i = 0; i < splitted.length; i++) {
      const cls = splitted[i];

      if (cls.length > 0) {
        let ret = styles[cls];
        // try fallback with magic functions
        if (!ret) {
          const [fnName, ...args] = cls.split(/_(?=[^_])/);
          if (typeof options.fn[fnName] === 'function') {
            ret = options.fn[fnName].apply(elementsTree, args);
          }
        }

        // Style found
        if (ret) {
          Array.isArray(ret)
            ? Array.prototype.push.apply(translatedStyle, ret)
            : translatedStyle.push(ret);
        } else {
          // throw new Error(`style '${cls}' not found`);
          // should warning instead
          console.warn(`style '${cls}' not found`);
        }
      }
    }
  }

  return translatedStyle;
};

const recursiveStyle = elementsTree => {
  if (React.isValidElement(elementsTree)) {
    const { props } = elementsTree;
    const newProps = {};
    let translated = false;
    const mapPropKeys = {};

    // we can use magic clsPropName to get all other style props
    if (options.clsPropName) {
      mapPropKeys[options.clsPropName] = 'style';
      for (const propKey in props) {
        if (
          propKey.substr(-options.clsPropName.length) === options.clsPropNameCap
        ) {
          mapPropKeys[propKey] =
            propKey.substr(0, propKey.length - options.clsPropName.length) +
            'Style';
        }
      }
    }

    // override by clsMap
    Object.assign(mapPropKeys, options.clsMap);

    for (const propKey in mapPropKeys) {
      const targetPropKey = mapPropKeys[propKey];
      const translatedStyle = transformStyle(
        elementsTree,
        props[targetPropKey],
        props[propKey]
      );
      // there is something to translate
      if (translatedStyle) {
        newProps[targetPropKey] = translatedStyle;
        translated = true;
      }
    }

    let newChildren = props.children;
    if (Array.isArray(newChildren)) {
      /* Convert child array */
      newChildren = React.Children.toArray(newChildren);
      for (let i = 0; i < newChildren.length; i++) {
        const c = newChildren[i];
        if (React.isValidElement(c)) {
          const converted = recursiveStyle(c);
          if (converted !== c) {
            translated = true;
            newChildren[i] = converted;
          }
        }
      }
    } else {
      /* Convert single child */
      const converted = recursiveStyle(newChildren);
      if (converted !== newChildren) {
        translated = true;
        newChildren = converted;
      }
    }

    if (translated) {
      return React.cloneElement(elementsTree, newProps, newChildren);
    }
  }

  // must decorate wrap with the first React element, not HOC
  // in this case you should pass cls down to wrapped component then use wrap decorator
  return elementsTree;
};

export const wrap = componentOrFunction => {
  if (
    componentOrFunction.prototype &&
    'render' in componentOrFunction.prototype
  ) {
    const WrappedComponent = componentOrFunction;
    const newClass = class extends WrappedComponent {
      render() {
        return recursiveStyle(super.render());
      }
    };

    /* Fix name */
    newClass.displayName =
      WrappedComponent.displayName || WrappedComponent.name;

    return newClass;
  }

  const func = componentOrFunction;

  return function wrappedRender(...args) {
    /* eslint-disable no-invalid-this */
    return recursiveStyle(func.apply(this, args));
  };
};

export const build = (updatedOptions, StyleSheet) => {
  const styleSheet = {};
  // we use array to force assign and return new object
  // updatedOptions.styles is the object containing all POSITION-related objects generated
  // from themes
  if (Array.isArray(updatedOptions.styles)) {
    updatedOptions.styles.forEach(style => Object.assign(styleSheet, style));
  }

  // updatedOptions.remScaled is the object containing all SIZE-related objects generated
  // from themes
  if (Array.isArray(updatedOptions.remScaled)) {
    /* Calculate rem scales */
    const updatedSizes = {};
    // set default rem to options.rem
    const defaultRem = updatedOptions.rem || options.rem;
    updatedOptions.remScaled.forEach(subSheet => {
      for (const key in subSheet) {
        const styleObj = subSheet[key];
        for (const name in styleObj) {
          const val = styleObj[name];
          const size =
            val *
            (name === 'fontSize' && updatedOptions.fontRem
              ? updatedOptions.fontRem
              : defaultRem);

          styleSheet[key] = {
            [name]: size
          };
          // we have rem in options.rem, so no need to store calculated Sizes
          updatedSizes[key] = size;
        }
      }
    });

    Object.assign(sizes, hyphensToUnderscores(updatedSizes));
  }

  /* Colors */
  if (typeof updatedOptions.colors === 'object') {
    for (const name in updatedOptions.colors) {
      const val = updatedOptions.colors[name];
      styleSheet[name] = { color: val };
      styleSheet[`bg-${name}`] = bg(val);
      styleSheet[`b--${name}`] = b_(val);
      styleSheet[`tint-${name}`] = tint(val);
    }
  }

  /* Font-families */
  if (typeof updatedOptions.fonts === 'object') {
    for (const key in updatedOptions.fonts) {
      styleSheet[`ff-${key}`] = { fontFamily: updatedOptions.fonts[key] };
    }
  }

  Object.assign(styles, StyleSheet.create(hyphensToUnderscores(styleSheet)));
  // console.log({ sizes });
  // update options deeply
  merge(options, updatedOptions);

  // head of time calculation for clsPropName capitalization, if not give
  if (updatedOptions.clsPropNameCap === undefined) {
    options.clsPropNameCap =
      options.clsPropName.charAt(0).toUpperCase() +
      options.clsPropName.substr(1);
  }
};
