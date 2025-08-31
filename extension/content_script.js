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

function fillApontamento(days) {
  const list = Array.isArray(days) ? days : getBusinessDaysOfCurrentMonth();
  if (!Array.isArray(list) || list.length === 0) return;

  console.log('Dias úteis do mês:', list);
  const firstDay = list[0];
  if (!firstDay) return;

  const formatted = firstDay.split('-').reverse().join('/');
  const dateField = document.getElementById(
    "ctl00_MainContent_ControleApontamento_txtDataApontamento"
  );
  const effortField =
    document.getElementById(
      "ctl00_MainContent_ControleApontamento_CaixaEsforço"
    ) ||
    document.getElementById(
      "ctl00_MainContent_ControleApontamento_CaixaEsforco"
    );
  const statusField = document.getElementById(
    "ctl00_MainContent_ControleApontamento_CaixaStatus"
  );

  if (dateField) {
    dateField.value = formatted;
    dateField.dispatchEvent(new Event("change", { bubbles: true }));
  } else {
    console.warn("Campo de data não encontrado");
  }
  if (effortField) {
    effortField.value = "08:00";
    effortField.dispatchEvent(new Event("change", { bubbles: true }));
  } else {
    console.warn("Campo de esforço não encontrado");
  }
  if (statusField) {
    statusField.value = "99";
    statusField.dispatchEvent(new Event("change", { bubbles: true }));
  } else {
    console.warn("Campo de status não encontrado");
  }
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
  btn.textContent = 'Preencher Data';
  btn.addEventListener('click', () => fillApontamento());

  dateField.parentNode.appendChild(btn);
}

insertFillButton();
