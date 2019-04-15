
/**
 * 检查是否是function
 */
export function isFunction (value) {
  return Object.prototype.toString.call(value) === '[object Function]';
}

/**
 * 检查是否是数组
 */
export const isArray = Array.isArray || function (value) {
  return toString.call(value) === '[object Array]';
};

/**
 * 检查是否是Object
 */
export function isObject (value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 检查是否是Object
 */
export function isString (value) {
  return Object.prototype.toString.call(value) === '[object String]';
}

/**
 * 检查是否是Undefined
 */
export function isUndefined (value) {
  return Object.prototype.toString.call(value) === '[object Undefined]';
}

export function getMobileSystem () {
  const ua = window.navigator.userAgent ||
    window.navigator.vendor ||
    window.navigator.opera;

  if ((/iPhone|iPad|iPod/i).test(ua)) {
    return 'iOS';
  } else if ((/Mac OS|Macintosh/i).test(ua)) {
    return 'iOS';
  } else if ((/Android/i).test(ua)) {
    return 'Android';
  } else {
    return 'Android';
  }
}
//
// export function parseUrl () {
//   const query = location.search.slice(1);
//   const searchParams = new URLSearchParams(query);
//   const obj = {};
//   for (const p of searchParams) {
//     obj[p[0]] = p[1];
//   }
//   return obj;
// }

const FN_MATCH_REGEXP = /^\s*function (\w+)/;
// https://github.com/vuejs/vue/blob/dev/src/core/util/props.js#L159
export const getType = (fn) => {
  const type = (fn !== null && fn !== undefined) ? (fn.type ? fn.type : fn) : null;
  const match = type && type.toString().match(FN_MATCH_REGEXP);
  return match && match[1];
};

export const getNativeType = (value) => {
  if (value === null || value === undefined) return null;
  const match = value.constructor.toString().match(FN_MATCH_REGEXP);
  return match && match[1];
};
