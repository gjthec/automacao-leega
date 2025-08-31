# automacao-leega

## Extensão de Automação

O diretório `extension` contém uma extensão de navegador (manifesto v3) direcionada ao site de Apontamento da Leega. Para carregá-la no Chrome:

1. Acesse `chrome://extensions/`.
2. Habilite o **Modo do desenvolvedor**.
3. Clique em **Carregar sem empacotar** e selecione a pasta `extension`.

A extensão injeta um script na página para auxiliar no preenchimento automático. Ela oferece um **popup** com os botões "Listar dias úteis do mês" e "Cadastrar Data" e, na própria página de Apontamento, um botão "Preencher Data" ao lado do campo de data.

- Ao clicar em "Listar dias úteis do mês", as datas de segunda a sexta do mês corrente são exibidas no console da página.
- Ao clicar em "Cadastrar Data" (no popup) ou "Preencher Data" (na página), a extensão calcula os dias úteis do mês, envia a lista à página e insere a primeira data útil no campo de data, além de preencher automaticamente os campos de esforço (`08:00`) e status (`99`). O campo "Data" (`txtDataApontamento`) recebe a data no formato `dd/mm/aaaa` e o botão "Salvar" é acionado automaticamente.

- O cálculo das datas considera o fuso horário local e o script tenta localizar os campos de esforço e status mesmo que os IDs variem (ex.: `CaixaEsforco`).

Se a aba ativa não estiver na página de Apontamento, uma mensagem de erro será registrada no console.
