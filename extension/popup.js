function formatISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getBusinessDaysOfMonth(year, month) {
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

function getBusinessDaysOfCurrentMonth() {
  const today = new Date();
  return getBusinessDaysOfMonth(today.getFullYear(), today.getMonth());
}

function getBusinessDaysOfLastMonth() {
  const today = new Date();
  // Dia 0 do mês atual = último dia do mês anterior (ajusta ano em janeiro)
  const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  return getBusinessDaysOfMonth(lastMonth.getFullYear(), lastMonth.getMonth());
}

async function sendMessageToActiveTab(message) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) {
      console.error('Nenhuma aba ativa encontrada');
      return;
    }

    chrome.tabs.sendMessage(tab.id, message, () => {
      if (chrome.runtime.lastError) {
        console.error(
          'Conteúdo não disponível na aba atual:',
          chrome.runtime.lastError.message
        );
      }
    });
  } catch (err) {
    console.error('Erro ao comunicar com a aba:', err.message);
  }
}

document.getElementById('businessDaysBtn').addEventListener('click', () => {
  const businessDays = getBusinessDaysOfCurrentMonth();
  sendMessageToActiveTab({
    type: 'LIST_BUSINESS_DAYS',
    payload: { days: businessDays },
  });
});

document.getElementById('fillDatePopupBtn').addEventListener('click', () => {
  const businessDays = getBusinessDaysOfCurrentMonth();
  sendMessageToActiveTab({
    type: 'FILL_APONTAMENTO_DATE',
    payload: { days: businessDays },
  });
});

document.getElementById('lastMonthBtn').addEventListener('click', () => {
  const businessDays = getBusinessDaysOfLastMonth();
  sendMessageToActiveTab({
    type: 'FILL_APONTAMENTO_DATE',
    payload: { days: businessDays },
  });
});
