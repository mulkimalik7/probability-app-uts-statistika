import { requireProbability, requirePercent, assertProbabilityResult } from './validation.js';
import { formatNumber, formatPercent } from './probabilitas-dasar.js';

export function totalProbability(groups) {
  if (!Array.isArray(groups) || groups.length < 2) {
    throw new Error('Hukum probabilitas total memerlukan sedikitnya dua kelompok.');
  }

  const validatedGroups = groups.map((group, index) => {
    if (!group || typeof group !== 'object') {
      throw new Error(`Data kelompok ${index + 1} tidak valid.`);
    }
    const name = typeof group.name === 'string' ? group.name.trim() : '';
    if (!name) throw new Error(`Nama kelompok ${index + 1} wajib diisi.`);
    return {
      name,
      proportion: requireProbability(group.proportion, `P(${name})`),
      conditionalProbability: requireProbability(group.conditionalProbability, `P(B|${name})`)
    };
  });

  const proportionSum = validatedGroups.reduce((sum, group) => sum + group.proportion, 0);
  if (Math.abs(proportionSum - 1) > 1e-10) {
    throw new Error(`Total proporsi kelompok harus sama dengan 1. Total saat ini ${formatNumber(proportionSum)}.`);
  }

  const contributions = validatedGroups.map((group) => ({
    ...group,
    value: group.proportion * group.conditionalProbability
  }));
  const value = assertProbabilityResult(
    contributions.reduce((sum, group) => sum + group.value, 0),
    'Probabilitas total P(B)'
  );
  const contributionTerms = contributions.map((group) => formatNumber(group.value));

  return {
    value,
    formula: 'P(B) = Σ P(B|Ai) × P(Ai)',
    steps: [
      `Total proporsi kelompok = ${validatedGroups.map((group) => formatNumber(group.proportion)).join(' + ')} = ${formatNumber(proportionSum)}`,
      ...contributions.map((group) => `${group.name}: P(B|Ai) × P(Ai) = ${formatNumber(group.conditionalProbability)} × ${formatNumber(group.proportion)} = ${formatNumber(group.value)}`),
      `P(B) = ${contributionTerms.join(' + ')} = ${formatNumber(value)}`
    ],
    interpretation: `Berdasarkan proporsi masing-masing kelompok dan probabilitas kejadian B pada setiap kelompok, peluang keseluruhan kejadian B adalah ${formatPercent(value)}.`
  };
}

/** Bentuk Bayes umum: P(A|B) = P(B|A) P(A) / P(B). */
export function bayesGeneral(prior, likelihood, evidence) {
  const pA = requireProbability(prior, 'P(A)');
  const pBGivenA = requireProbability(likelihood, 'P(B|A)');
  const pB = requireProbability(evidence, 'P(B)');
  if (pB === 0) throw new Error('P(B) tidak boleh 0 karena menjadi penyebut.');
  const numerator = pBGivenA * pA;
  const maximumEvidence = numerator + (1 - pA);
  const tolerance = Number.EPSILON * 8;
  if (pB < numerator - tolerance || pB > maximumEvidence + tolerance) {
    throw new Error('Input tidak konsisten: P(B) harus berada di antara P(B|A) × P(A) dan P(B|A) × P(A) + (1 − P(A)).');
  }
  const value = assertProbabilityResult(numerator / pB, 'Hasil Teorema Bayes');
  return { value, formula: 'P(A|B) = [P(B|A) × P(A)] / P(B)', steps: [`P(A|B) = (${formatNumber(pBGivenA)} × ${formatNumber(pA)}) / ${formatNumber(pB)}`, `P(A|B) = ${formatNumber(value)}`], interpretation: `Setelah bukti B diketahui, probabilitas A adalah ${formatPercent(value)}.` };
}

/** Model deteksi: A = phishing, B = sistem memberi tanda. */
export function phishingBayes(prevalencePercent, sensitivityPercent, falsePositivePercent) {
  const prevalence = requirePercent(prevalencePercent, 'Prevalensi');
  const sensitivity = requirePercent(sensitivityPercent, 'Sensitivitas');
  const falsePositive = requirePercent(falsePositivePercent, 'False positive');
  const truePositiveContribution = sensitivity * prevalence;
  const falsePositiveContribution = falsePositive * (1 - prevalence);
  const flagged = truePositiveContribution + falsePositiveContribution;
  if (flagged === 0) throw new Error('Probabilitas email ditandai bernilai 0, sehingga posterior tidak dapat dihitung.');
  const posterior = assertProbabilityResult(truePositiveContribution / flagged, 'Posterior phishing');
  return {
    value: flagged,
    secondaryValue: posterior,
    formula: 'P(tandai) = P(tandai|phishing)P(phishing) + P(tandai|bukan phishing)P(bukan phishing)',
    steps: [
      `P(tandai) = (${formatNumber(sensitivity)} × ${formatNumber(prevalence)}) + (${formatNumber(falsePositive)} × ${formatNumber(1 - prevalence)})`,
      `P(tandai) = ${formatNumber(flagged)} (${formatPercent(flagged)})`,
      `P(phishing|tandai) = (${formatNumber(sensitivity)} × ${formatNumber(prevalence)}) / ${formatNumber(flagged)}`,
      `P(phishing|tandai) = ${formatNumber(posterior)} (${formatPercent(posterior)})`
    ],
    interpretation: `Probabilitas sebuah email ditandai sistem adalah ${formatPercent(flagged)}. Jika sebuah email sudah ditandai, probabilitas email tersebut benar-benar phishing adalah ${formatPercent(posterior)}.`
  };
}
