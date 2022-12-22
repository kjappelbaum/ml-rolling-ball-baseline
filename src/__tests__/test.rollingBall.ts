import { rollingBallBaseline } from '../../testData/baselines';
import { spectrum } from '../../testData/spectrum';
import { rollingBall } from '../rollingBall';

describe('test rollingball', () => {
  it('compare with R', () => {
    const bl = rollingBall(spectrum, { windowM: 200, windowS: 400 });
    expect(bl).toHaveLength(spectrum.length);
    for (let i = 0; i < spectrum.length; i++) {
      expect(
        Math.abs(bl[i] - rollingBallBaseline[i]) / rollingBallBaseline[i],
      ).toBeLessThan(0.2);
    }

    let y = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    let correction = rollingBall(y);

    for (let i = 0; i < y.length; i++) {
      expect(correction[i]).toBeCloseTo(1);
    }
  });
});
