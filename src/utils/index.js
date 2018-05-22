/* eslint-disable import/prefer-default-export */

export function declOfNum(n, titles) {
  return titles[ // eslint-disable-next-line no-nested-ternary
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
  ];
}

export function restrainMinMax(number = 0, min = 0, max) {
  return Math.min(Math.max(parseInt(number, 10), min), max);
}

export function path(pathArr, obj) {
  if (arguments.length === 1) {
    return objHolder => path(pathArr, objHolder);
  }
  if (obj === null || obj === undefined) {
    return undefined;
  }
  let willReturn = obj;
  let counter = 0;

  const pathArrValue = typeof pathArr === 'string' ?
    pathArr.split('.') :
    pathArr;

  while (counter < pathArrValue.length) {
    if (willReturn === null || willReturn === undefined) {
      return undefined;
    }
    willReturn = willReturn[pathArrValue[counter]];
    counter++; // eslint-disable-line no-plusplus
  }

  return willReturn;
}
