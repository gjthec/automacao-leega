console.log("Extensão carregada na página de Apontamento da Leega");

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'LIST_BUSINESS_DAYS') {
    const { days } = msg.payload || {};
    if (Array.isArray(days)) {
      console.log('Dias úteis do mês:', days);
    }
  }

  if (msg.type === 'FILL_APONTAMENTO_DATE') {
    const { days } = msg.payload || {};
    fillApontamento(days);
  }
});

function formatISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getBusinessDaysOfCurrentMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
    const day = date.getDay();
    if (day >= 1 && day <= 5) {
      days.push(formatISODate(date));
    }
    date.setDate(date.getDate() + 1);
  }
  return days;
}

async function fillApontamento(days) {
  const list = Array.isArray(days) ? days : getBusinessDaysOfCurrentMonth();
  if (!Array.isArray(list) || list.length === 0) return;

  console.log('Dias úteis do mês:', list);

  for (const isoDay of list) {
    const formatted = isoDay.split('-').reverse().join('/');

    const dateField = await waitForElement(
      'ctl00_MainContent_ControleApontamento_txtDataApontamento'
    );
    const effortField =
      (await waitForElement(
        'ctl00_MainContent_ControleApontamento_CaixaEsforço'
      )) ||
      (await waitForElement(
        'ctl00_MainContent_ControleApontamento_CaixaEsforco'
      ));
    const statusField = await waitForElement(
      'ctl00_MainContent_ControleApontamento_CaixaStatus'
    );
    const saveButton = await waitForElement(
      'ctl00_MainContent_ControleApontamento_BotaoSalvar'
    );

    if (!dateField || !effortField || !statusField || !saveButton) {
      console.warn('Algum campo não foi encontrado, interrompendo');
      return;
    }

    dateField.value = formatted;
    effortField.value = '08:00';
    statusField.value = '99';
    saveButton.click();

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

async function waitForElement(id, timeout = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const el = document.getElementById(id);
    if (el) return el;
    await new Promise((r) => setTimeout(r, 100));
  }
  return null;
}

function insertFillButton() {
  const dateField = document.getElementById(
    'ctl00_MainContent_ControleApontamento_txtDataApontamento'
  );
  if (!dateField) return;

  if (document.getElementById('fillDateBtn')) return;

  const btn = document.createElement('button');
  btn.id = 'fillDateBtn';
  btn.type = 'button';
  btn.textContent = 'Preencher mês';
  btn.addEventListener('click', () => fillApontamento());

  dateField.parentNode.appendChild(btn);
}

insertFillButton();
// Preenche automaticamente o campo de data com a data atual, se existir
(function () {
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }
})();
