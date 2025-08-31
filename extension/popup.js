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

document.getElementById('businessDaysBtn').addEventListener('click', async () => {
  const businessDays = getBusinessDaysOfCurrentMonth();
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) {
      console.error('Nenhuma aba ativa encontrada');
      return;
    }

    await chrome.tabs.sendMessage(tab.id, {
      type: 'LOG_BUSINESS_DAYS',
      payload: businessDays,
    });
  } catch (err) {
    console.error('Conteúdo não disponível na aba atual:', err.message);
  }
});
