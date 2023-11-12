import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// Renderiza o componente App na raiz do documento HTML
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
// Obtém o elemento HTML com o id "root" para a renderização do React
  document.getElementById("root")
);
