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
