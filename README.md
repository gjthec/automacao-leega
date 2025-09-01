# automacao-leega

## Extensão de Automação

O diretório `extension` contém uma extensão de navegador (manifesto v3) direcionada ao site de Apontamento da Leega. Para carregá-la no Chrome:

1. Acesse `chrome://extensions/`.
2. Habilite o **Modo do desenvolvedor**.
3. Clique em **Carregar sem empacotar** e selecione a pasta `extension`.

A extensão injeta um script na página para auxiliar no preenchimento automático. Ela oferece um **popup** com os botões "Listar dias úteis do mês" e "Preencher mês" e, na própria página de Apontamento, um botão "Preencher mês" ao lado do campo de data.

- Ao clicar em "Listar dias úteis do mês", as datas de segunda a sexta do mês corrente são exibidas no console da página.
- Ao clicar em "Preencher mês" (no popup) ou "Preencher mês" (na página), a extensão calcula os dias úteis do mês, envia a lista à página e percorre todas as datas, preenchendo os campos de data, esforço (`08:00`) e status (`99`) e clicando em "Salvar" para cada dia com uma pausa de aproximadamente dois segundos entre cada cadastro.
- Após cada salvamento, os campos são buscados novamente para acompanhar os postbacks da página e evitar erros de validação.
- O cálculo das datas considera o fuso horário local e o script tenta localizar os campos de esforço e status mesmo que os IDs variem (ex.: `CaixaEsforco`).

Se a aba ativa não estiver na página de Apontamento, uma mensagem de erro será registrada no console.
