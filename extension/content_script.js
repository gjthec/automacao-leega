console.log("Extensão carregada na página de Apontamento da Leega");

// Preenche automaticamente o campo de data com a data atual, se existir
(function () {
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }
})();

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'LOG_BUSINESS_DAYS') {
    console.log('Dias úteis do mês:', msg.payload);
  }
});
