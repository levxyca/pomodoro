# Pomodoro

Uma ferramenta para auxiliar quem trabalha com o método pomodoro 🍎

## Processo de Desenvolvimento

1. Criação do site *Pomodoro* usando HTML semântico e CSS
2. [Estruturação da lógica para a construção do pomodoro](#estruturação-da-lógica-para-a-construção-do-pomodoro)
    - [O que meu pomodoro faz?](#o-que-meu-pomodoro-faz)
        - [Escopo](#escopo)
        - [Opcional](#opcional)
    - [Como deve funcionar?](#como-deve-funcionar)
        - [Botões](#botões)

### Estruturação da lógica para a construção do pomodoro

#### O que meu pomodoro faz?

##### Escopo

- [x] [Timer 25 min](#timer-de-25-min): O timer deve conter uma tela com os minutos e segundos regressivamente;
- [ ] Timer de intervalo (5 min) : Uma opção para iniciar o timer como modo de intervalo, com 5 minutos regressivamente (mesmo timer da funcionalidade anterior);
- [ ] Som de notificação:  Fazer um som ao terminar o tempo do timer.

##### Opcional

- [ ] Mostrar notificações na plataforma escolhida (android notification/ ios notification/ chrome notification);
- [ ] Ter uma opção para mudar o tempo do pomodoro de 25 minutos para qualquer outro;
- [ ] Sugerir para o usuário depois de ter feito 4 pomodoros (timer 25 min) um descanso de  10 min;
Contar a quantidade de pomodoros feitos no dia.

#### Como deve funcionar?

##### Botões

Por padrão o pomodoro irá vir com o timer de 25 minutos, sendo possível alterar isso pelos botões `pomodoro` e `short break`.

Clicando no `pomodoro` ele mostra o timer de 25 minutos e clicando no `short break` ele mostra o timer de intervalo de 5 minutos.

Para isso, criei um objeto `timer` que tem como propriedade `pomodoro` e `short break`, inicializando eles com seus respectivos minutos.

```javascript
const timer = {
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
  view.textContent = `${timer.pomodoro}:00`;
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
  view.textContent = `${timer.pomodoro}:00`;
});

shortBreakBtn.addEventListener("click", () => {
  view.textContent = `${timer.shortBreak}:00`;
});
```
