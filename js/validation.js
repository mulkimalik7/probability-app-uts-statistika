/** Validasi input probabilitas dan jumlah kejadian. */
function toFiniteNumber(value, label, allowDecimalComma = false) {
  if (typeof value !== 'number' && typeof value !== 'string') {
    throw new Error(`${label} harus diisi dengan angka yang valid.`);
  }
  if (typeof value === 'string' && value.trim() === '') {
    throw new Error(`${label} wajib diisi.`);
  }
  let normalized = value;
  if (typeof value === 'string') {
    const text = value.trim();
    const commaCount = (text.match(/,/g) ?? []).length;
    const dotCount = (text.match(/\./g) ?? []).length;
    if (allowDecimalComma && ((commaCount && dotCount) || commaCount > 1 || dotCount > 1)) {
      throw new Error(`${label} harus memakai satu pemisah desimal, titik atau koma.`);
    }
    const decimalPattern = allowDecimalComma
      ? /^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/
      : /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/;
    if (!decimalPattern.test(text)) {
      throw new Error(`${label} harus diisi dengan angka desimal yang valid.`);
    }
    normalized = allowDecimalComma ? text.replace(',', '.') : text;
  }
  const number = Number(normalized);
  if (!Number.isFinite(number)) throw new Error(`${label} harus diisi dengan angka yang valid.`);
  return number;
}

export function requireProbability(value, label = 'Probabilitas') {
  const number = toFiniteNumber(value, label, true);
  if (number < 0 || number > 1) throw new Error(`${label} harus berada di antara 0 dan 1.`);
  return number;
}

export function requireNonNegative(value, label = 'Nilai') {
  const number = toFiniteNumber(value, label);
  if (number < 0) throw new Error(`${label} harus berupa angka nol atau lebih.`);
  return number;
}

export function requirePositive(value, label = 'Nilai') {
  const number = toFiniteNumber(value, label);
  if (number <= 0) throw new Error(`${label} harus lebih besar dari 0.`);
  return number;
}

export function requireNonNegativeInteger(value, label = 'Nilai') {
  const number = toFiniteNumber(value, label);
  if (!Number.isSafeInteger(number) || number < 0) {
    throw new Error(`${label} harus berupa bilangan bulat nol atau lebih.`);
  }
  return number;
}

export function requirePositiveInteger(value, label = 'Nilai') {
  const number = toFiniteNumber(value, label);
  if (!Number.isSafeInteger(number) || number <= 0) {
    throw new Error(`${label} harus berupa bilangan bulat lebih besar dari 0.`);
  }
  return number;
}

export function requirePercent(value, label = 'Persentase') {
  const number = toFiniteNumber(value, label, true);
  if (number < 0 || number > 100) {
    throw new Error(`${label} harus berada di antara 0 dan 100 persen.`);
  }
  return number / 100;
}

export function assertProbabilityResult(value, label = 'Hasil') {
  const tolerance = 1e-10;
  if (!Number.isFinite(value) || value < -tolerance || value > 1 + tolerance) {
    throw new Error(`${label} tidak valid. Periksa kembali hubungan antar-kejadian dan nilai input.`);
  }
  return Math.min(1, Math.max(0, value));
}
