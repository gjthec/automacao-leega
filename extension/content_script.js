console.log("Extensão carregada na página de Apontamento da Leega");

// Preenche automaticamente o campo de data com a data atual, se existir
(function () {
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }
})();
