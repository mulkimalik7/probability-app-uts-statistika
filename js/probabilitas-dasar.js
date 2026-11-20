import { requireProbability, requireNonNegativeInteger, requirePositiveInteger, assertProbabilityResult } from './validation.js';

export function probabilityFromCounts(favourable, sampleSpace) {
  const a = requireNonNegativeInteger(favourable, 'Jumlah kejadian n(A)');
  const s = requirePositiveInteger(sampleSpace, 'Jumlah ruang sampel n(S)');
  if (a > s) throw new Error('Jumlah kejadian n(A) tidak boleh lebih besar dari ruang sampel n(S).');
  const result = a / s;
  return { value: result, formula: 'P(A) = n(A) / n(S)', steps: [`P(A) = ${a} / ${s}`, `P(A) = ${formatNumber(result)}`], interpretation: `Peluang kejadian A adalah ${formatPercent(result)}.` };
}

export function complement(pA) {
  const a = requireProbability(pA, 'P(A)');
  const value = 1 - a;
  return { value, formula: "P(A') = 1 − P(A)", steps: [`P(A') = 1 − ${formatNumber(a)}`, `P(A') = ${formatNumber(value)}`], interpretation: `Peluang kejadian A tidak terjadi adalah ${formatPercent(value)}.` };
}

export function union(pA, pB, pIntersection) {
  const a = requireProbability(pA, 'P(A)');
  const b = requireProbability(pB, 'P(B)');
  const intersection = requireProbability(pIntersection, 'P(A ∩ B)');
  if (intersection > Math.min(a, b)) throw new Error('P(A ∩ B) tidak boleh lebih besar daripada P(A) atau P(B).');
  const value = assertProbabilityResult(a + b - intersection, 'Probabilitas gabungan');
  return { value, formula: 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', steps: [`P(A ∪ B) = ${formatNumber(a)} + ${formatNumber(b)} − ${formatNumber(intersection)}`, `P(A ∪ B) = ${formatNumber(value)}`], interpretation: `Peluang A atau B terjadi (atau keduanya) adalah ${formatPercent(value)}.` };
}

export function intersectionFromUnion(pA, pB, pUnion) {
  const a = requireProbability(pA, 'P(A)');
  const b = requireProbability(pB, 'P(B)');
  const combined = requireProbability(pUnion, 'P(A ∪ B)');
  const value = assertProbabilityResult(a + b - combined, 'Probabilitas irisan');
  if (value > Math.min(a, b)) throw new Error('Nilai gabungan tidak konsisten dengan P(A) dan P(B).');
  return { value, formula: 'P(A ∩ B) = P(A) + P(B) − P(A ∪ B)', steps: [`P(A ∩ B) = ${formatNumber(a)} + ${formatNumber(b)} − ${formatNumber(combined)}`, `P(A ∩ B) = ${formatNumber(value)}`], interpretation: `Peluang A dan B terjadi bersamaan adalah ${formatPercent(value)}.` };
}

export function mutuallyExclusive(pA, pB) {
  const a = requireProbability(pA, 'P(A)');
  const b = requireProbability(pB, 'P(B)');
  const value = assertProbabilityResult(a + b, 'Probabilitas gabungan untuk kejadian saling lepas');
  return { value, secondaryValue: 0, formula: 'P(A ∪ B) = P(A) + P(B), karena P(A ∩ B) = 0', steps: [`P(A ∪ B) = ${formatNumber(a)} + ${formatNumber(b)}`, `P(A ∪ B) = ${formatNumber(value)}`, 'P(A ∩ B) = 0'], interpretation: `Karena A dan B saling lepas, keduanya tidak dapat terjadi bersamaan. Peluang A atau B terjadi adalah ${formatPercent(value)}.` };
}

export function independent(pA, pB) {
  const a = requireProbability(pA, 'P(A)');
  const b = requireProbability(pB, 'P(B)');
  const value = a * b;
  return { value, formula: 'P(A ∩ B) = P(A) × P(B), untuk kejadian independen', steps: [`P(A ∩ B) = ${formatNumber(a)} × ${formatNumber(b)}`, `P(A ∩ B) = ${formatNumber(value)}`], interpretation: `Jika A dan B independen, peluang keduanya terjadi bersamaan adalah ${formatPercent(value)}.` };
}

export function formatNumber(value) {
  if (value === 0 || Object.is(value, -0)) return '0';
  return new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 8 }).format(value);
}
export function formatPercent(value) {
  if (value === 0 || Object.is(value, -0)) return new Intl.NumberFormat('id-ID', { style: 'percent' }).format(0);
  return new Intl.NumberFormat('id-ID', { style: 'percent', maximumSignificantDigits: 8 }).format(value);
}
