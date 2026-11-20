import { probabilityFromCounts, complement, union, intersectionFromUnion, mutuallyExclusive, independent } from './probabilitas-dasar.js';
import { conditionalProbability, generalMultiplicationRule } from './probabilitas-bersyarat.js';
import { totalProbability, bayesGeneral, phishingBayes } from './teorema-bayes.js';
import { getFormValues, showResult, showError } from './ui.js';

const calculators = {
  'event-probability': (v) => probabilityFromCounts(v.favourable, v.sampleSpace),
  complement: (v) => complement(v.pA),
  union: (v) => union(v.pA, v.pB, v.pIntersection),
  intersection: (v) => intersectionFromUnion(v.pA, v.pB, v.pUnion),
  'mutually-exclusive': (v) => mutuallyExclusive(v.pA, v.pB),
  independent: (v) => independent(v.pA, v.pB),
  conditional: (v) => conditionalProbability(v.pIntersection, v.pB),
  'general-multiplication': (v) => generalMultiplicationRule(v.pA, v.pBGivenA),
  'total-probability': (v) => totalProbability(v.groups),
  'bayes-general': (v) => bayesGeneral(v.prior, v.likelihood, v.evidence),
  phishing: (v) => phishingBayes(v.prevalence, v.sensitivity, v.falsePositive)
};

for (const form of document.querySelectorAll('form[data-calculator]')) {
  const resultContainer = form.parentElement.querySelector('.result');
  const clearResult = () => {
    resultContainer.replaceChildren();
    resultContainer.hidden = true;
    resultContainer.classList.remove('error');
  };
  const syncCountMaximum = () => {
    if (form.dataset.calculator !== 'event-probability') return;
    const favourableInput = form.elements.namedItem('favourable');
    const sampleSpaceInput = form.elements.namedItem('sampleSpace');
    const sampleSpace = Number(sampleSpaceInput.value);
    if (sampleSpaceInput.value.trim() !== '' && Number.isInteger(sampleSpace) && sampleSpace > 0) {
      favourableInput.max = String(sampleSpace);
    } else {
      favourableInput.removeAttribute('max');
    }
  };

  if (form.dataset.calculator === 'total-probability') {
    const groupsContainer = form.querySelector('[data-probability-groups]');
    const groupTemplate = form.querySelector('template[data-probability-group-template]');
    const addGroupButton = form.querySelector('[data-add-probability-group]');
    let nextGroupNumber = groupsContainer.querySelectorAll('[data-probability-group]').length;

    const updateRemoveButtons = () => {
      const groups = groupsContainer.querySelectorAll('[data-probability-group]');
      groups.forEach((group) => {
        group.querySelector('[data-remove-probability-group]').disabled = groups.length <= 2;
      });
    };

    const appendGroup = (number, name = `Kelompok ${number}`) => {
      const group = groupTemplate.content.firstElementChild.cloneNode(true);
      group.querySelector('legend').textContent = name;
      group.querySelector('[data-group-name]').value = name;
      groupsContainer.append(group);
    };

    groupsContainer.addEventListener('input', (event) => {
      if (!(event.target instanceof Element)) return;
      const nameInput = event.target.closest('[data-group-name]');
      if (!nameInput) return;
      nameInput.closest('[data-probability-group]').querySelector('legend').textContent = nameInput.value.trim();
    });

    addGroupButton.addEventListener('click', () => {
      nextGroupNumber += 1;
      appendGroup(nextGroupNumber);
      updateRemoveButtons();
      clearResult();
    });

    groupsContainer.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) return;
      const removeButton = event.target.closest('[data-remove-probability-group]');
      if (!removeButton || groupsContainer.querySelectorAll('[data-probability-group]').length <= 2) return;
      removeButton.closest('[data-probability-group]').remove();
      updateRemoveButtons();
      clearResult();
    });

    form.addEventListener('reset', (event) => {
      event.preventDefault();
      groupsContainer.replaceChildren();
      nextGroupNumber = 0;
      for (let number = 1; number <= 3; number += 1) {
        appendGroup(number, `Subnet ${String.fromCharCode(64 + number)}`);
        nextGroupNumber = number;
      }
      updateRemoveButtons();
      clearResult();
    });
  }

  syncCountMaximum();
  form.addEventListener('input', (event) => {
    clearResult();
    event.target.removeAttribute('aria-invalid');
    syncCountMaximum();
  });
  form.addEventListener('change', clearResult);
  form.addEventListener('invalid', (event) => {
    clearResult();
    event.target.setAttribute('aria-invalid', 'true');
  }, true);
  form.addEventListener('reset', () => {
    clearResult();
    form.querySelectorAll('[aria-invalid]').forEach((input) => input.removeAttribute('aria-invalid'));
    if (form.dataset.calculator === 'event-probability') {
      form.elements.namedItem('favourable').removeAttribute('max');
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const type = form.dataset.calculator;
    clearResult();
    try {
      const calculate = calculators[type];
      if (!calculate) throw new Error('Jenis kalkulator belum tersedia.');
      const values = getFormValues(form);
      if (type === 'total-probability') {
        values.groups = [...form.querySelectorAll('[data-probability-group]')].map((group) => ({
          name: group.querySelector('[data-group-name]').value,
          proportion: group.querySelector('[data-group-proportion]').value,
          conditionalProbability: group.querySelector('[data-group-conditional]').value
        }));
      }
      const result = calculate(values);
      showResult(resultContainer, result);
    } catch (error) {
      showError(resultContainer, error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui.');
    }
  });
}

for (const module of document.querySelectorAll('[data-calculator-module]')) {
  const switcher = module.querySelector('.calculator-switch');
  const buttons = [...switcher.querySelectorAll('[data-show-panel]')];
  const panels = [...module.querySelectorAll('[data-calculator-panel]')];

  switcher.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest('[data-show-panel]');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;

    const selectedPanel = panels.find((panel) => panel.dataset.calculatorPanel === button.dataset.showPanel);
    if (!selectedPanel) return;

    buttons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    panels.forEach((panel) => {
      panel.hidden = panel !== selectedPanel;
      panel.querySelectorAll('.result').forEach((result) => {
        result.replaceChildren();
        result.hidden = true;
        result.classList.remove('error');
      });
      panel.querySelectorAll('[aria-invalid]').forEach((input) => input.removeAttribute('aria-invalid'));
    });
    updateActiveNav();
  });
}

// Menandai menu navigasi yang sedang terlihat.
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('.page-section')];

const setActiveNav = (id) => {
  let matched = false;
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
      matched = true;
    } else {
      link.removeAttribute('aria-current');
    }
  });
  return matched;
};

const updateActiveNav = () => {
  if (!sections.length) return;

  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const scrollHeight = document.documentElement.scrollHeight;

  // 1. Kondisi mencapai dasar halaman:
  // Ketika scroll sudah sampai di bagian bawah dokumen (dengan toleransi 50px),
  // section terakhir (Panduan) harus aktif.
  if (windowHeight + scrollY >= scrollHeight - 50) {
    setActiveNav(sections[sections.length - 1].id);
    return;
  }

  // 2. Kondisi di bagian paling atas halaman:
  if (scrollY < 60) {
    setActiveNav(sections[0].id);
    return;
  }

  // 3. Posisi section (menggunakan batas bawah sticky header sebagai titik acuan):
  const topbar = document.querySelector('.topbar');
  const headerHeight = topbar ? topbar.offsetHeight : 76;
  const activationPoint = headerHeight + 50;

  let activeSection = null;
  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= activationPoint && rect.bottom > activationPoint) {
      activeSection = section;
      break;
    }
  }

  if (!activeSection) {
    for (let i = sections.length - 1; i >= 0; i--) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= activationPoint) {
        activeSection = sections[i];
        break;
      }
    }
  }

  if (activeSection) {
    setActiveNav(activeSection.id);
  }
};

let isClickScrolling = false;
let scrollTimeoutId = null;

const stopClickScrolling = () => {
  if (isClickScrolling) {
    isClickScrolling = false;
    clearTimeout(scrollTimeoutId);
    updateActiveNav();
  }
};

// Event listener untuk klik pada menu navigasi dan link anchor lainnya
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', () => {
    const targetId = anchor.getAttribute('href')?.slice(1);
    if (sections.some((s) => s.id === targetId)) {
      setActiveNav(targetId);
      isClickScrolling = true;
      clearTimeout(scrollTimeoutId);
      scrollTimeoutId = setTimeout(() => {
        isClickScrolling = false;
        updateActiveNav();
      }, 800);
    }
  });
});

window.addEventListener('wheel', stopClickScrolling, { passive: true });
window.addEventListener('touchstart', stopClickScrolling, { passive: true });
if ('onscrollend' in window) {
  window.addEventListener('scrollend', stopClickScrolling, { passive: true });
}

let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (isClickScrolling) return;
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      updateActiveNav();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

window.addEventListener('resize', () => {
  updateActiveNav();
}, { passive: true });

window.addEventListener('hashchange', () => {
  if (window.location.hash) {
    const hashId = window.location.hash.slice(1);
    if (sections.some((s) => s.id === hashId)) {
      setActiveNav(hashId);
    }
  }
});

// Jalankan saat inisialisasi
if (window.location.hash) {
  const initialHash = window.location.hash.slice(1);
  if (sections.some((s) => s.id === initialHash)) {
    setActiveNav(initialHash);
  } else {
    updateActiveNav();
  }
} else {
  updateActiveNav();
}
