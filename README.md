# Pomodoro

Uma ferramenta para auxiliar quem trabalha com o método pomodoro 🍎

<img width="960" alt="image" src="https://github.com/levxyca/pomodoro/assets/19956731/a180c42d-6ed7-4bcb-9ae6-bf2d692c968a">

## Processo de Desenvolvimento

1. Criei o site *Pomodoro* utilizando HTML semântico e CSS, buscando uma estrutura clara e organizada para melhorar a acessibilidade e a usabilidade do usuário
2. [Estruturação da lógica para a construção do pomodoro](#estruturação-da-lógica-para-a-construção-do-pomodoro)
    - [O que meu pomodoro faz?](#o-que-meu-pomodoro-faz)
        - [Escopo](#escopo)
        - [Opcional](#opcional)
    - [Como deve funcionar?](#como-deve-funcionar)
        - [Botões](#botões)
        - [Timer](#timer)
    - [Executando o timer de acordo com o modo escolhido](#executando-o-timer-de-acordo-com-o-modo-escolhido)
    - [Som de notificação](#som-de-notificação)
    - [Contar a quantidade de pomodoros feitos no dia](#contar-a-quantidade-de-pomodoros-feitos-no-dia)
    -[Sugerir para a pessoa usuária depois de ter feito 4 pomodoros (timer 25 min) um descanso de  10 min](#sugerir-para-a-pessoa-usuária-depois-de-ter-feito-4-pomodoros-timer-25-min-um-descanso-de-10-min)
    - [Ter uma opção para mudar o tempo do pomodoro de 25 minutos para qualquer outro](#ter-uma-opção-para-mudar-o-tempo-do-pomodoro-de-25-minutos-para-qualquer-outro)
    - [Mostrar notificações](#mostrar-notificações)

### Estruturação da lógica para a construção do pomodoro

#### O que meu pomodoro faz?

##### Escopo

- [x] Timer 25 min: O timer deve conter uma tela com os minutos e segundos regressivamente;
- [x] Timer de intervalo (5 min) : Uma opção para iniciar o timer como modo de intervalo, com 5 minutos regressivamente (mesmo timer da funcionalidade anterior);
- [x] Som de notificação:  Fazer um som ao terminar o tempo do timer.

##### Opcional

- [x] Mostrar notificações na plataforma escolhida (android notification/ ios notification/ chrome notification);
- [x] Ter uma opção para mudar o tempo do pomodoro de 25 minutos para qualquer outro;
- [x] Sugerir para o usuário depois de ter feito 4 pomodoros (timer 25 min) um descanso de  10 min;
- [x] Contar a quantidade de pomodoros feitos no dia.

#### Como deve funcionar?

##### Botões

Por padrão o pomodoro irá vir com o timer de 25 minutos, sendo possível alterar isso pelos botões `pomodoro` e `short break`.

Clicando no `pomodoro` ele mostra o timer de 25 minutos e clicando no `short break` ele mostra o timer de intervalo de 5 minutos.

Para isso, criei um objeto `time` que tem como propriedade `pomodoro` e `short break`, inicializando eles com seus respectivos minutos.

```javascript
const time = {
    pomodoro: 25,
    shortBreak: 5,
}
```

Para manipular o que é mostrado no HTML, selecionei a minha `section` com a classe `timer__container-view` no meu `script.js`.

```javascript
const view = document.querySelector(".timer__container-view");
```

Inicializei o valor do meu pomodoro com o timer de 25 minutos por padrão.

```javascript
window.addEventListener("DOMContentLoaded", function () {
  view.textContent = `${time.pomodoro}:00`;
});
```

> Adicionado o evento DOMContentLoaded ao objeto window que significa que quando todo o HTML for completamente carregado a nossa view irá receber o valor inicial de pomodoro.
>
> Inicialmente utilizado template string para inicializar a view.

Para a troca entre `pomodoro` e `short break`, criei uma nova classe no HTML específica para cada um deles e selecionei os dois botões adicionando um evento de click que define o respectivo tempo.

```javascript
const pomodoroBtn = document.querySelector(".pomodoro");
const shortBreakBtn = document.querySelector(".shortbreak");

pomodoroBtn.addEventListener("click", () => {
  view.textContent = `${time.pomodoro}:00`;
});

shortBreakBtn.addEventListener("click", () => {
  view.textContent = `${time.shortBreak}:00`;
});
```

##### Timer

A primeira coisa é entender como trabalhar com intervalos de tempo no JavaScript.

Temos o método `setInterval()`que repete chamadas de funções ou executam trechos de código com um tempo de espera fixo entre cada chamada.

Para o timer funcionar, irei usar o `setInterval()` para fazer a contagem do tempo e ir mostrando isso no HTML.

Comecei adicionando ao nosso objeto `time` a propriedade `secondsTimer`, `seconds` e `minutes` sendo inicialidados com o valor `0` para auxiliar na função que irei criar chamada `timer`.

Essa função irá receber como parâmetro os minutos que o timer vai funcionar.

Dentro da função, esses minutos serão transformados em segundos e irei adicionar um `setInterval()` que vai executar uma outra função onde transformo os segundos novamente em minutos para mostrar no HTML e esses segundos irão ser subtraídos cada vez que a função executar até eles segundos serem igual a 0.

Quando chegar em 0, é executado um `clearInterval()` para cancelar essa execução.

```javascript
function timer(mins) {
  time.secondsTimer = mins * 60 || 0;
  let interval = setInterval(() => {
    time.seconds = time.secondsTimer % 60 || 0;
    time.minutes = parseInt(time.secondsTimer / 60) % 60 || 0;
    view.textContent = `${time.minutes}:${time.seconds}`;
    time.secondsTimer--;
    if (!time.secondsTimer) {
      clearInterval(interval);
      view.textContent = "00:00";
    }
  }, 1000);
}
```

#### Executando o timer de acordo com o modo escolhido

Selecionei o botão `start` e adicionei um evento de click nele que dispara uma função.

Para saber o tempo que será usado no timer, eu verifico o conteúdo dentro da minha `view` que é onde o tempo é mostrado no HTML.

Pego esse tempo e executo a função `timer` passando com parâmetro o tempo.

#### Som de notificação

Criei uma pasta `assets` onde irei armazenar o audio que quero tocar quando o tempo do timer acabar.

O construtor `Audio()` cria e retorna um novo `HTMLAudioElement` que pode ser anexado a um documento para o usuário interagir e/ou ouvir, ou pode ser usado fora da tela para gerenciar e reproduzir áudio.

No caso dessa aplicação, irei instanciar uma nova classe chamada `notification` passando o audio escolhido como parâmetro.

Dentro da função `timer`, junto com o `clearInterval()` executo o método `play()`, fazendo com que o áudio seja tocado quando o timer for finalizado.

#### Contar a quantidade de pomodoros feitos no dia

Adicionei ao meu objeto `time` a propriedade `qtdPomodoro`.

Dentro da função `timer`, ao final do pomodoro, se a quantidade de minutos inicial for diferente de 5, ele adiciona +1 ao completar o pomodoro.

Ao final do pomodoro toca um alerta avisando a quantidade de pomodoros já realizados.

#### Sugerir para a pessoa usuária depois de ter feito 4 pomodoros (timer 25 min) um descanso de  10 min

Adicionei ao meu objeto `time` a propriedade `qtdPomodoro25`.

Adicionei uma verificação dentro da função `timer` que segue a lógica anterior, mas dessa vez verificando se os minutos são especificamente 25.

Quando `qtdPomodoro25` chega a quantidade 4, é disparado um alerta ao final do pomodoro sugerindo para a usuária depois de ter feito 4 pomodoros (timer 25 min) um descanso de  10 min.

#### Ter uma opção para mudar o tempo do pomodoro de 25 minutos para qualquer outro

Criei um botão no HTML para permitir com que a pessoa usuária consiga alterar os minutos do pomodoro através de um input criado.

Adicionei um evento de click no botão de editar onde ao clicar é permitido a pessoa usuária inserir o tempo que desejar no pomodoro.

Faço algumas validações para garantir que irei receber apenas os números dos minutos.

#### Mostrar notificações

Para mostrar as notificações no browser eu utilizar a `Notification API`.

A primeira coisa é pedir permissão a pessoa usuária para poder usar as notificações do browser.

Por fim, criei uma função para gerar as notificações, que recebe como parâmetro um objeto com as opções da notificação.

Dentro da função, instâncio um construtor `Notification` passando as opções que recebo por parâmetro.

Feito com 💙 por [levxyca](https://levxyca.com/)
