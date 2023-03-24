# ml-rolling-ball-baseline

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

Rolling ball baseline correction. The algorithm was initially described in [[1]](#ref1).

<a name="ref1"></a> 1. [Kneen, M. A.; Annegarn, H. J. Algorithm for Fitting XRF, SEM and PIXE X-Ray Spectra Backgrounds. Nuclear Instruments and Methods in Physics Research Section B: Beam Interactions with Materials and Atoms 1996, 109–110, 209–213.](<https://doi.org/10.1016/0168-583X(95)00908-6>)

<a name="ref3"></a> 2. [Liland KH, Almøy T, Mevik B (2010).
“Optimal Choice of Baseline Correction for Multivariate Calibration of Spectra.”
Applied Spectroscopy, 64, 1007-1016.](https://cran.r-project.org/web/packages/baseline/baseline.pdf)

## Installation

`$ npm i ml-rolling-ball-baseline`

## Usage

```js
import { rollingBall } from 'ml-rolling-ball-baseline';

// spectrum is an array
const spectrum=[1, 2, 1, ...];

// you need to provide and array with the data and
// two numbers indicating the "size" of the balls,
// i.e., the maximization/minimization and the smoothing window.
const baseline = rollingBall(spectrum, 200, 400);
```

## [API Documentation](https://mljs.github.io/rolling-ball-baseline/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-rolling-ball-baseline.svg
[npm-url]: https://www.npmjs.com/package/ml-rolling-ball-baseline
[ci-image]: https://github.com/mljs/rolling-ball-baseline/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/mljs/rolling-ball-baseline/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/ml-rolling-ball-baseline.svg
[download-url]: https://www.npmjs.com/package/ml-rolling-ball-baseline
