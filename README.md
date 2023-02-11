# 💰 Desafio Justa - FrontEnd

<p align="center">
  🚧 Projeto Recriar projeto FlexPag de Historico de Cotação | Concluído 🚀 🚧
</p>

## 💻 Sobre o Projeto
<p>
  A aplicação trata-se de um site que tem a finalidade de consultar o histórico de cotação de moedas BRL de acordo com a data e moeda estrangeira.
  O desafio consiste em um consumo de uma API onde recebemos as informações como:
</p>

  - Sigla de moedas
  - Nome de moedas estrangeiras
  - Data de consulta
  - Valor de compra
  - Valor de venda
  - Data e hora de cotação
  - Nome

  Com base nestas informações, foi desenvolvido um site em React com TypeScript onde foi criado campos que recebe os seguintes valores:
  - Moeda
  - Data de início
  - Data Final
  
  Recebendo esses dados, a aplicação faz uma busca no endpoint e mostra em uma tabela com os seguintes dados:
  - Valor de compra
  - Valor de venda
  - Data e hora de cotação
  - Nome
  
  Foi utilizado o moment.js para formatar o campo de datas para um formato reconhecido pelo endpoint. Para validação de campos, utilizei a função onBlur onde quando o clicado no component e não preenchido nenhuma informação, o mesmo informa que o campo é obrigatorio.
  <a href="https://files.fm/u/nrcbuy8ye#/view/chrome-capture-2023-1-10.gif"><img src="https://files.fm/thumb_show.php?i=dkmgs8q8k"></a>
  
  No campo abaixo, foi criado uma função que filtra os resultados na tabela, com objetivo de obter um dado expecifico.
  
  
  Para enviar requisição e receber resultados, foi ultilizado o o fetch().
  
  ## 🎨 View
<a href="https://files.fm/u/kpn8392my#/view/ww.gif"><img src="https://files.fm/thumb_show.php?i=2c58bnvyv"></a>

## 💻 Tecnologias
As seguintes ferramentas foram usadas na construção do projeto:

- React
- TypeScript
- Chakra UI
- Moment.js
- React Icons


## 🌐 Link da Aplicação 
<a href="https://desafiojusta.netlify.app/" class="navbar-brand" target="_blank">
      <p>Acessar</p>
</a>

