import { requireProbability, assertProbabilityResult } from './validation.js';
import { formatNumber, formatPercent } from './probabilitas-dasar.js';

export function conditionalProbability(pIntersection, pB) {
  const intersection = requireProbability(pIntersection, 'P(A ∩ B)');
  const b = requireProbability(pB, 'P(B)');
  if (b === 0) throw new Error('P(B) tidak boleh 0 karena menjadi penyebut.');
  if (intersection > b) throw new Error('P(A ∩ B) tidak boleh lebih besar dari P(B).');
  const value = assertProbabilityResult(intersection / b, 'Probabilitas bersyarat');
  return { value, formula: 'P(A|B) = P(A ∩ B) / P(B)', steps: [`P(A|B) = ${formatNumber(intersection)} / ${formatNumber(b)}`, `P(A|B) = ${formatNumber(value)}`], interpretation: `Dengan syarat B telah terjadi, peluang A terjadi adalah ${formatPercent(value)}.` };
}

export function generalMultiplicationRule(pA, pBGivenA) {
  const a = requireProbability(pA, 'P(A)');
  const bGivenA = requireProbability(pBGivenA, 'P(B|A)');
  if (a === 0) throw new Error('P(A) harus lebih besar dari 0 agar P(B|A) dapat digunakan.');
  const value = assertProbabilityResult(a * bGivenA, 'Probabilitas irisan');
  if (value > a) throw new Error('Hasil P(A ∩ B) tidak boleh lebih besar dari P(A).');
  return {
    value,
    formula: 'P(A ∩ B) = P(A) × P(B|A)',
    steps: [
      `P(A ∩ B) = ${formatNumber(a)} × ${formatNumber(bGivenA)}`,
      `P(A ∩ B) = ${formatNumber(value)}`
    ],
    interpretation: `Peluang A dan B terjadi bersama, dengan peluang B setelah A terjadi, adalah ${formatPercent(value)}.`
  };
}
