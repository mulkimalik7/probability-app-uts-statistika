import { formatNumber, formatPercent } from './probabilitas-dasar.js';

export function getFormValues(form) {
  return Object.fromEntries(new FormData(form).entries());
}

export function showResult(container, result, extra = []) {
  container.replaceChildren();
  container.hidden = false;
  container.classList.remove('error');

  const heading = document.createElement('h4');
  heading.textContent = 'Hasil perhitungan';
  container.append(heading);

  const value = document.createElement('p');
  value.className = 'result-value';
  value.textContent = `${formatNumber(result.value)} (${formatPercent(result.value)})`;
  container.append(value);

  if (result.secondaryValue !== undefined) {
    const secondary = document.createElement('p');
    secondary.innerHTML = '<strong>Hasil tambahan:</strong> ' + formatNumber(result.secondaryValue) + ' (' + formatPercent(result.secondaryValue) + ')';
    container.append(secondary);
  }

  if (result.formula) {
    const formula = document.createElement('p');
    formula.textContent = `Rumus: ${result.formula}`;
    container.append(formula);
  }
  if (result.steps?.length) {
    const details = document.createElement('details');
    details.className = 'result-steps';
    const summary = document.createElement('summary');
    summary.textContent = 'Lihat langkah perhitungan';
    const list = document.createElement('ol');
    for (const step of result.steps) {
      const item = document.createElement('li');
      item.textContent = step;
      list.append(item);
    }
    details.append(summary, list);
    container.append(details);
  }
  if (result.interpretation) {
    const interpretation = document.createElement('p');
    interpretation.innerHTML = '<strong>Interpretasi:</strong> ' + result.interpretation;
    container.append(interpretation);
  }
  for (const line of extra) {
    const paragraph = document.createElement('p');
    paragraph.textContent = line;
    container.append(paragraph);
  }
}

export function showError(container, message) {
  container.replaceChildren();
  container.hidden = false;
  container.classList.add('error');
  const heading = document.createElement('h4');
  heading.textContent = 'Input belum dapat diproses';
  const detail = document.createElement('p');
  detail.textContent = message;
  container.append(heading, detail);
}
