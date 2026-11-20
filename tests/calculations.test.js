import test from 'node:test';
import assert from 'node:assert/strict';
import { probabilityFromCounts, complement, union, intersectionFromUnion, mutuallyExclusive, independent, formatNumber, formatPercent } from '../js/probabilitas-dasar.js';
import { conditionalProbability, generalMultiplicationRule } from '../js/probabilitas-bersyarat.js';
import { totalProbability, bayesGeneral, phishingBayes } from '../js/teorema-bayes.js';

const assertClose = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-12, `${actual} should be close to ${expected}`);

test('P(A) from event counts', () => assert.equal(probabilityFromCounts(3, 10).value, 0.3));
test('complement', () => assert.equal(complement(0.3).value, 0.7));
test('union', () => assert.equal(union(0.3, 0.4, 0).value, 0.7));
test('intersection from union', () => assert.ok(Math.abs(intersectionFromUnion(0.6, 0.5, 0.8).value - 0.3) < 1e-12));
test('mutually exclusive events', () => assert.equal(mutuallyExclusive(0.3, 0.4).value, 0.7));
test('independent events', () => assert.equal(independent(0.3, 0.4).value, 0.12));
test('conditional probability', () => assert.equal(conditionalProbability(0.2, 0.5).value, 0.4));
test('general Bayes', () => assert.ok(Math.abs(bayesGeneral(0.2, 0.9, 0.3).value - 0.6) < 1e-12));
test('phishing case expected output', () => {
  const result = phishingBayes(8, 92, 3);
  assert.ok(Math.abs(result.value - 0.1012) < 1e-12);
  assert.ok(Math.abs(result.secondaryValue - 0.7272727272727273) < 1e-12);
});
test('reject probability outside 0..1', () => assert.throws(() => complement(1.2), /antara 0 dan 1/));
test('reject zero denominator for conditional probability', () => assert.throws(() => conditionalProbability(0.2, 0), /tidak boleh 0/));

test('event counts accept integer boundaries', () => {
  assert.equal(probabilityFromCounts(0, 10).value, 0);
  assert.equal(probabilityFromCounts(10, 10).value, 1);
  assert.equal(probabilityFromCounts(7, 10).value, 0.7);
});

test('event counts reject fractional, empty, non-finite, negative, and impossible values', () => {
  for (const [favourable, sampleSpace] of [
    [0.5, 2.5],
    ['', 10],
    [1, ''],
    [-1, 10],
    [1, 0],
    [11, 10],
    [Number.MAX_SAFE_INTEGER + 1, Number.MAX_SAFE_INTEGER + 1],
    [NaN, 10],
    [Infinity, 10],
    [1, Infinity]
  ]) {
    assert.throws(() => probabilityFromCounts(favourable, sampleSpace));
  }
});

test('probability validators reject empty and non-finite values while accepting decimals and boundaries', () => {
  assert.equal(complement('0.25').value, 0.75);
  assert.equal(complement(0).value, 1);
  assert.equal(complement(1).value, 0);
  for (const value of ['', ' ', NaN, Infinity, -Infinity, 'NaN', 'Infinity']) {
    assert.throws(() => complement(value));
  }
  assert.throws(() => complement(-0.1));
  assert.throws(() => complement(1.1));
});

test('probability inputs accept decimal notation and reject unsupported numeric formats', () => {
  assertClose(complement('0.3').value, 0.7);
  assertClose(complement('0,3').value, 0.7);
  assert.equal(complement('1').value, 0);
  assert.equal(complement('0').value, 1);
  for (const value of ['0x1', '0b1', '0o1', '1e-1']) {
    assert.throws(() => complement(value), /angka desimal/);
  }
  assert.throws(() => probabilityFromCounts('0x1', 10), /angka desimal/);
});

test('decimal point and comma are normalized independently per probability field', () => {
  assertClose(complement('0.3').value, 0.7);
  assertClose(complement('0,3').value, 0.7);
  assertClose(complement('0.75').value, 0.25);
  assertClose(complement('0,75').value, 0.25);
  assertClose(union('0.3', '0,4', '0.1').value, 0.6);
  assertClose(independent('0.3', '0,4').value, 0.12);
  assert.equal(formatNumber(0.3), '0,3');
  assert.equal(formatPercent(0.3), '30%');
});

test('probability input rejects mixed or repeated decimal separators', () => {
  for (const value of ['0.3,0.4', '0,3.4', '0,,3', '0.3.4']) {
    assert.throws(() => complement(value), /pemisah desimal/);
  }
});

test('union and intersection respect Frechet bounds', () => {
  assertClose(union(0.7, 0.6, 0.3).value, 1);
  assertClose(union(0.7, 0.6, 0.6).value, 0.7);
  assert.throws(() => union(0.7, 0.6, 0.2));
  assert.throws(() => union(0.7, 0.6, 0.61));
  assertClose(intersectionFromUnion(0.7, 0.6, 1).value, 0.3);
  assertClose(intersectionFromUnion(0.7, 0.6, 0.7).value, 0.6);
  assert.throws(() => intersectionFromUnion(0.7, 0.6, 0.69));
});

test('conditional probability rejects impossible intersection and zero denominator', () => {
  assert.throws(() => conditionalProbability(0.3, 0.2));
  assert.throws(() => conditionalProbability(0, 0));
});

test('general multiplication rule calculates the intersection', () => {
  assertClose(generalMultiplicationRule(0.25, 0.2).value, 0.05);
  assertClose(generalMultiplicationRule(0.5, 0.4).value, 0.2);
  assertClose(generalMultiplicationRule(0.25, 4 / 19).value, 1 / 19);
});

test('general multiplication rule accepts dot and comma independently', () => {
  assertClose(generalMultiplicationRule('0.25', '0.2').value, 0.05);
  assertClose(generalMultiplicationRule('0,25', '0,2').value, 0.05);
  assertClose(generalMultiplicationRule('0.25', '0,2').value, 0.05);
  assertClose(generalMultiplicationRule('0,25', '0.2').value, 0.05);
});

test('general multiplication rule rejects invalid probabilities and zero P(A)', () => {
  for (const [pA, pBGivenA] of [
    ['', 0.2],
    [0.25, ''],
    [-0.1, 0.2],
    [0.25, -0.1],
    [1.1, 0.2],
    [0.25, 1.1],
    [0, 0.2],
    ['not a number', 0.2],
    [0.25, 'Infinity'],
    [NaN, 0.2],
    [0.25, Infinity]
  ]) {
    assert.throws(() => generalMultiplicationRule(pA, pBGivenA));
  }
});

test('Bayes rejects impossible evidence bounds and invalid inputs', () => {
  assert.equal(bayesGeneral(0.2, 0.9, 0.18).value, 1);
  assert.ok(Math.abs(bayesGeneral(0.2, 0.9, 0.98).value - (0.18 / 0.98)) < 1e-12);
  assert.throws(() => bayesGeneral(0.2, 0.9, 0.17), /P\(B\) harus berada/);
  assert.throws(() => bayesGeneral(0.2, 0.9, 0.99), /P\(B\) harus berada/);
  assert.throws(() => bayesGeneral(0.2, 0.9, 0.98000000000001), /P\(B\) harus berada/);
  assert.throws(() => bayesGeneral(0.2, 0.9, 0));
  assert.throws(() => bayesGeneral(0.2, 0.9, 1.01));
  assert.throws(() => bayesGeneral('', 0.9, 0.3));
  assert.throws(() => bayesGeneral(0.2, NaN, 0.3));
  assert.throws(() => bayesGeneral(0.2, Infinity, 0.3));
});

test('total probability reproduces the PPT weighted contribution example', () => {
  const result = totalProbability([
    { name: 'Subnet A', proportion: '0.50', conditionalProbability: '0.02' },
    { name: 'Subnet B', proportion: '0.30', conditionalProbability: '0.04' },
    { name: 'Subnet C', proportion: '0.20', conditionalProbability: '0.10' }
  ]);
  assertClose(result.value, 0.042);
  assert.ok(result.steps.some((step) => step.includes('Subnet A') && step.includes('0,01')));
  assert.ok(result.steps.some((step) => step.includes('Subnet B') && step.includes('0,012')));
  assert.ok(result.steps.some((step) => step.includes('Subnet C') && step.includes('0,02')));
  assert.match(result.formula, /Σ/);
  assert.match(result.interpretation, /4,2%/);
});

test('total probability uses edited group names in calculation steps', () => {
  const result = totalProbability([
    { name: 'Grup Kustom', proportion: 0.5, conditionalProbability: 0.2 },
    { name: 'Kelompok B', proportion: 0.5, conditionalProbability: 0.4 }
  ]);
  assert.ok(result.steps.some((step) => step.startsWith('Grup Kustom:')));
});

test('total probability uses weighted contributions for two and four groups', () => {
  assertClose(totalProbability([
    { name: 'A', proportion: 0.3, conditionalProbability: 0.2 },
    { name: 'B', proportion: 0.7, conditionalProbability: 0.4 }
  ]).value, 0.34);
  assert.notEqual(totalProbability([
    { name: 'A', proportion: 0.3, conditionalProbability: 0.2 },
    { name: 'B', proportion: 0.7, conditionalProbability: 0.4 }
  ]).value, 0.3);
  assertClose(totalProbability([
    { name: 'A', proportion: 0.25, conditionalProbability: 0.1 },
    { name: 'B', proportion: 0.25, conditionalProbability: 0.2 },
    { name: 'C', proportion: 0.25, conditionalProbability: 0.3 },
    { name: 'D', proportion: 0.25, conditionalProbability: 0.4 }
  ]).value, 0.25);
});

test('total probability accepts independent dot and comma decimal inputs', () => {
  assertClose(totalProbability([
    { name: 'A', proportion: '0.5', conditionalProbability: '0,02' },
    { name: 'B', proportion: '0,3', conditionalProbability: '0.04' },
    { name: 'C', proportion: '0.2', conditionalProbability: '0,10' }
  ]).value, 0.042);
});

test('total probability requires at least two named groups with complete valid values', () => {
  assert.throws(() => totalProbability([]), /sedikitnya dua kelompok/);
  assert.throws(() => totalProbability([{ name: 'A', proportion: 1, conditionalProbability: 0.5 }]), /sedikitnya dua kelompok/);
  assert.throws(() => totalProbability([
    { name: ' ', proportion: 0.5, conditionalProbability: 0.2 },
    { name: 'B', proportion: 0.5, conditionalProbability: 0.4 }
  ]), /Nama kelompok/);
  assert.throws(() => totalProbability([
    { name: 'A', proportion: '', conditionalProbability: 0.2 },
    { name: 'B', proportion: 1, conditionalProbability: 0.4 }
  ]));
  assert.throws(() => totalProbability([
    { name: 'A', proportion: 0.5, conditionalProbability: '' },
    { name: 'B', proportion: 0.5, conditionalProbability: 0.4 }
  ]));
});

test('total probability rejects partition weights that do not sum to one', () => {
  const groups = (first, second) => [
    { name: 'A', proportion: first, conditionalProbability: 0.2 },
    { name: 'B', proportion: second, conditionalProbability: 0.4 }
  ];
  assertClose(totalProbability(groups(0.5, 0.5)).value, 0.3);
  assert.throws(() => totalProbability(groups(0.4, 0.5)), /Total proporsi kelompok harus sama dengan 1/);
  assert.throws(() => totalProbability(groups(0.6, 0.5)), /Total proporsi kelompok harus sama dengan 1/);
});

test('total probability rejects negative, out-of-range, NaN, and infinite inputs', () => {
  for (const [proportion, conditionalProbability] of [
    [-0.1, 0.2],
    [0.5, -0.1],
    [1.1, 0.2],
    [0.5, 1.1],
    [NaN, 0.2],
    [0.5, Infinity]
  ]) {
    assert.throws(() => totalProbability([
      { name: 'A', proportion, conditionalProbability },
      { name: 'B', proportion: 1 - proportion, conditionalProbability: 0.4 }
    ]));
  }
});

test('phishing inputs validate percentages and zero evidence denominator', () => {
  const result = phishingBayes(8.5, 92.5, 3.5);
  assert.ok(result.value > 0 && result.value < 1);
  assert.ok(result.secondaryValue >= 0 && result.secondaryValue <= 1);
  assert.throws(() => phishingBayes('', 92, 3));
  assert.throws(() => phishingBayes(101, 92, 3));
  const commaResult = phishingBayes('8,0', '92,0', '3,0');
  assertClose(commaResult.value, 0.1012);
  assertClose(commaResult.secondaryValue, 0.7272727272727273);
  assert.throws(() => phishingBayes('0x1', 92, 3), /angka desimal/);
  assert.throws(() => phishingBayes('-1', 92, 3));
  assert.throws(() => phishingBayes(8, 92, '3,0,1'));
  assert.throws(() => phishingBayes(0, 0, 0), /bernilai 0/);
});

test('small probabilities remain visible and negative zero is normalized', () => {
  assert.notEqual(formatNumber(0.0000004), '0');
  assert.notEqual(formatPercent(0.0000004), '0%');
  assert.equal(formatNumber(-0), '0');
  assert.equal(formatPercent(-0), '0%');
});
