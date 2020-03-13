var Binom = require('binomjs');
var binom = new Binom();

module.exports = (a, b) => {
    let plus = 0, minus = 0;
    const confidence = .95;

    if (!a.length || !b.length) {
        throw new Error('A and B should be lists of samples.');
    }

    if (a.length != b.length) {
        throw new Error('A and B should be lists with equal lengths.');
    }

    for (let i = 0; i < a.length; i++) {
        let diff = a[i] - b[i];
        if (diff > 0) {
            ++plus;
        }
        if (diff < 0) {
            ++minus;
        }
    }

    const sampleSize = plus + minus;

    const successes = (plus > minus) ? minus : plus;

    const result = binom.test(sampleSize, successes, sampleSize, sampleSize/2, confidence);

    return Object.assign(result, {
        sampleSize,
        successes,
        confidence
    });
}
