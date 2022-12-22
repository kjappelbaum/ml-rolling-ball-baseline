import { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';
import { xMean, xMaxValue, xMinValue } from 'ml-spectra-processing';

/**
 * Rolling ball baseline correction algorithm.
 * From the abstract of (1):
 * "This algorithm behaves equivalently to traditional polynomial backgrounds in simple spectra,
 * [...] and is considerably more robust for multiple overlapping peaks, rapidly varying background [...]
 *
 * The baseline is the trace one gets by rolling a ball below a spectrum. Algorithm has three steps:
 * Finding the minima in each window, find maxima among minima and then smooth over them by averaging.
 *
 * Reference:
 * (1) Kneen, M. A.; Annegarn, H. J.
 *     Algorithm for Fitting XRF, SEM and PIXE X-Ray Spectra Backgrounds.
 *     Nuclear Instruments and Methods in Physics Research Section B: Beam Interactions with Materials and Atoms 1996, 109–110, 209–213.
 *     https://doi.org/10.1016/0168-583X(95)00908-6.
 * (2) Kristian Hovde Liland, Bjørn-Helge Mevik, Roberto Canteri: baseline.
 *     https://cran.r-project.org/web/packages/baseline/index.html
 * @export
 * @param {Array} spectrum
 * @param {Object} [options={}]
 * @param {Number} [options.windowM] - width of local window for minimization/maximization, defaults to 4% of the spectrum length
 * @param {Number} [options.windowS] - width of local window for smoothing, defaults to 8% of the spectrum length
 */

interface Options {
  windowM: number;
  windowS: number;
}
export function rollingBall(
  spectrum: NumberArray,
  options: Partial<Options> = {}, // not specific enough => put two optional parameters with specific type
): NumberArray {
  if (!isAnyArray(spectrum)) {
    throw new Error('Spectrum must be an array');
  }

  if (spectrum.length === 0) {
    throw new TypeError('Spectrum must not be empty');
  }

  const numberPoints = spectrum.length;
  const maxima = new Float64Array(numberPoints);
  const minima = new Float64Array(numberPoints);
  const baseline = new Float64Array(numberPoints);

  // windowM 4 percent of spectrum length
  // windowS 8 percent of spectrum length
  const {
    windowM = Math.round(numberPoints * 0.04),
    windowS = Math.round(numberPoints * 0.08),
  } = options;

  // fi(1) in original paper
  for (let i = 0; i < spectrum.length; i++) {
    let windowLeft = Math.max(0, i - windowM);
    let windowRight = Math.min(i + windowM + 1, spectrum.length);

    minima[i] = xMinValue(spectrum, {
      fromIndex: windowLeft,
      toIndex: windowRight,
    });
  }

  // fi in original paper
  for (let i = 0; i < minima.length; i++) {
    let windowLeft = Math.max(0, i - windowM);
    let windowRight = Math.min(i + windowM + 1, minima.length);
    maxima[i] = xMaxValue(minima, {
      fromIndex: windowLeft,
      toIndex: windowRight,
    });
  }

  for (let i = 0; i < minima.length; i++) {
    let windowLeft = Math.max(0, i - windowS);
    let windowRight = Math.min(i + windowS + 1, maxima.length);
    baseline[i] = xMean(maxima.subarray(windowLeft, windowRight));
  }

  return baseline;
}
