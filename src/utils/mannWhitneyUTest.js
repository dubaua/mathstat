/* eslint-disable no-plusplus, no-mixed-operators */

/**
 * Original code https://gist.github.com/gungorbudak/1c3989cc26b9567c6e50
 */

const rank = {
  standard(array, key) {
    return array.sort((a, b) => a[key] - b[key]).map((item, index) => {
      const next = Object.assign({}, item);
      next.rank = index + 1;
      return next;
    });
  },

  fractional(array, key) {
    const next = this.standard(array, key);
    // now apply fractional
    let pos = 0;
    while (pos < array.length) {
      let sum = 0;
      let i = 0;
      for (i = 0; next[pos + i + 1] && next[pos + i][key] === next[pos + i + 1][key]; i++) {
        sum += next[pos + i].rank;
      }
      sum += next[pos + i].rank;
      const endPos = pos + i + 1;
      for (pos; pos < endPos; pos++) {
        next[pos].rank = sum / (i + 1);
      }
      pos = endPos;
    }
    return next;
  },
  rank(x, y) {
    let nx = x.length;
    let ny = y.length;
    const combined = [];
    while (nx--) {
      combined.push({
        set: 'x',
        val: x[nx],
      });
    }
    while (ny--) {
      combined.push({
        set: 'y',
        val: y[ny],
      });
    }
    return this.fractional(combined, 'val');
  },
};

const erf = function erf(x) {
  const cof = [
    -1.3026537197817094,
    6.4196979235649026e-1,
    1.9476473204185836e-2,
    -9.561514786808631e-3,
    -9.46595344482036e-4,
    3.66839497852761e-4,
    4.2523324806907e-5,
    -2.0278578112534e-5,
    -1.624290004647e-6,
    1.30365583558e-6,
    1.5626441722e-8,
    -8.5238095915e-8,
    6.529054439e-9,
    5.059343495e-9,
    -9.91364156e-10,
    -2.27365122e-10,
    9.6467911e-11,
    2.394038e-12,
    -6.886027e-12,
    8.94487e-13,
    3.13092e-13,
    -1.12708e-13,
    3.81e-16,
    7.106e-15,
    -1.523e-15,
    -9.4e-17,
    1.21e-16,
    -2.8e-17,
  ];
  let j = cof.length - 1;
  let isneg = false;
  let d = 0;
  let dd = 0;
  let tmp;
  let next;

  if (x < 0) {
    next = -x;
    isneg = true;
  }

  const t = 2 / (2 + next);
  const ty = 4 * t - 2;

  for (; j > 0; j--) {
    tmp = d;
    d = ty * d - dd + cof[j];
    dd = tmp;
  }

  const res = t * Math.exp(-next * next + 0.5 * (cof[0] + ty * d) - dd);
  return isneg ? res - 1 : 1 - res;
};

const dnorm = (x, mean, std) => 0.5 * (1 + erf((x - mean) / Math.sqrt(2 * std * std)));

const statistic = (x, y) => {
  const ranked = rank.rank(x, y);
  const nr = ranked.length;
  const nx = x.length;
  const ny = y.length;
  const ranksums = {
    x: 0,
    y: 0,
  };
  let i = 0;
  let t = 0;
  let nt = 1;

  while (i < nr) {
    if (i > 0) {
      if (ranked[i].val === ranked[i - 1].val) {
        nt++;
      } else if (nt > 1) {
        t += nr ** 3 - nt;
        nt = 1;
      }
    }
    ranksums[ranked[i].set] += ranked[i].rank;
    i++;
  }
  const tcf = 1 - t / (nr ** 3 - nr);
  const ux = nx * ny + nx * (nx + 1) / 2 - ranksums.x;
  const uy = nx * ny - ux;

  return {
    tcf,
    ux,
    uy,
    big: Math.max(ux, uy),
    small: Math.min(ux, uy),
  };
};

export default function (x, y, alt = 'two-sided', corr = true) {
  const nx = x.length; // x's size
  const ny = y.length; // y's size
  let f = 1;

  // test statistic
  const u = statistic(x, y);

  // mean compute and correct if given
  const mu = corr ? nx * ny / 2 + 0.5 : nx * ny / 2;

  // compute standard deviation using tie correction factor
  const std = Math.sqrt(u.tcf * nx * ny * (nx + ny + 1) / 12);

  // compute z according to given alternative
  let z;
  switch (alt) {
    case 'less':
      z = (u.ux - mu) / std;
      break;
    case 'greater':
      z = (u.uy - mu) / std;
      break;
    case 'two-sided':
    default:
      z = Math.abs((u.big - mu) / std);
      f = 2;
      break;
  }

  // compute p-value using CDF of standard normal
  const p = dnorm(-z, 0, 1) * f;

  return { U: u.small, p };
}
