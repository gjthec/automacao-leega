function getBusinessDaysOfCurrentMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
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
