# automacao-leega

## Extensão de Automação

O diretório `extension` contém uma extensão de navegador (manifesto v3) direcionada ao site de Apontamento da Leega. Para carregá-la no Chrome:

1. Acesse `chrome://extensions/`.
2. Habilite o **Modo do desenvolvedor**.
3. Clique em **Carregar sem empacotar** e selecione a pasta `extension`.

A extensão injeta um script na página para auxiliar no preenchimento automático e oferece um **popup** com o botão "Listar dias úteis do mês". Ao clicar neste botão, as datas de segunda a sexta do mês corrente são exibidas no console da página e a primeira data é preenchida no formulário junto com o esforço (`08:00`) e o status (`99`).
Se a aba ativa não estiver na página de Apontamento, uma mensagem de erro será registrada no console.
