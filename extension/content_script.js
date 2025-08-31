console.log("Extensão carregada na página de Apontamento da Leega");

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'FILL_APONTAMENTO_DATE') {
    const { firstDay, days } = msg.payload || {};

    if (Array.isArray(days)) {
      console.log('Dias úteis do mês:', days);
    }

    if (firstDay) {
      const formatted = firstDay.split('-').reverse().join('/');
      const dateField = document.getElementById(
        'ctl00_MainContent_ControleApontamento_txtDataApontamento'
      );
      const effortField = document.getElementById(
        'ctl00_MainContent_ControleApontamento_CaixaEsforço'
      );
      const statusField = document.getElementById(
        'ctl00_MainContent_ControleApontamento_CaixaStatus'
      );

      if (dateField) {
        dateField.value = formatted;
        dateField.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (effortField) {
        effortField.value = '08:00';
        effortField.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (statusField) {
        statusField.value = '99';
        statusField.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }
});

function getBusinessDaysOfCurrentMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
    const day = date.getDay();
    if (day >= 1 && day <= 5) {
      days.push(date.toISOString().split('T')[0]);
    }
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function fillApontamento() {
  const days = getBusinessDaysOfCurrentMonth();
  console.log('Dias úteis do mês:', days);
  const firstDay = days[0];
  if (!firstDay) return;

  const formatted = firstDay.split('-').reverse().join('/');
  const dateField = document.getElementById(
    'ctl00_MainContent_ControleApontamento_txtDataApontamento'
  );
  const effortField = document.getElementById(
    'ctl00_MainContent_ControleApontamento_CaixaEsforço'
  );
  const statusField = document.getElementById(
    'ctl00_MainContent_ControleApontamento_CaixaStatus'
  );

  if (dateField) {
    dateField.value = formatted;
    dateField.dispatchEvent(new Event('change', { bubbles: true }));
  }
  if (effortField) {
    effortField.value = '08:00';
    effortField.dispatchEvent(new Event('change', { bubbles: true }));
  }
  if (statusField) {
    statusField.value = '99';
    statusField.dispatchEvent(new Event('change', { bubbles: true }));
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
  btn.addEventListener('click', fillApontamento);

  dateField.parentNode.appendChild(btn);
}

insertFillButton();
