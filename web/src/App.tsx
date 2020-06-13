import React from 'react';
import './App.css';
import Routes from './../src/routes';

//JSX: syntaxe de XML dentro do javascript

//Estado/state: utilizamos estado quando desejamos guardar uma
//informação que vem de um componente. Estados são informações
//mantidas dentro do próprio componente.

//useState(0) -> retorna: [valor do estado, função para atualizar o valor do estado]

function App() {
  return(
    <Routes />
  );
}

export default App;
