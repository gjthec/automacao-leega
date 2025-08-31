console.log("Extensão carregada na página de Apontamento da Leega");

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'LOG_BUSINESS_DAYS') {
    console.log('Dias úteis do mês:', msg.payload);

    const firstDay = msg.payload && msg.payload[0];
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

      if (dateField) dateField.value = formatted;
      if (effortField) effortField.value = '08:00';
      if (statusField) statusField.value = '99';
    }
  }
});
