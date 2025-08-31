# automacao-leega

## Extensão de Automação

O diretório `extension` contém uma extensão de navegador (manifesto v3) direcionada ao site de Apontamento da Leega. Para carregá-la no Chrome:

1. Acesse `chrome://extensions/`.
2. Habilite o **Modo do desenvolvedor**.
3. Clique em **Carregar sem empacotar** e selecione a pasta `extension`.

A extensão injeta um script na página para auxiliar no preenchimento automático do campo de data e oferece um **popup** com o botão "Listar dias úteis do mês". Ao clicar neste botão, as datas de segunda a sexta do mês corrente são exibidas no console da página.
