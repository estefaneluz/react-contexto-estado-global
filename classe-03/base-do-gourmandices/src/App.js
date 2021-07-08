import { createContext, useState } from "react";
import { Cabecalho } from "./componentes/Cabecalho";
import { Produtos } from "./componentes/Produtos";
import { produtos } from "./utils/produtos";
import "./styles.css";

export const ContextoCarrinhoProduto = createContext();

export default function App() {
  const [carrinho, setCarrinho] = useState({});

  const adicionarCarrinho = (id) => {
    setCarrinho((carrinho) => {
      const novoCarrinho = { ...carrinho };
      novoCarrinho[id] = 1;

      return novoCarrinho;
    });
  };

  const mudarQtdNoCarrinho = (id, qtd) =>
    setCarrinho((carrinho) => {
      const novoCarrinho = { ...carrinho };
      novoCarrinho[id] += qtd;

      if (novoCarrinho[id] === 0) removerDoCarrinho(id);

      return novoCarrinho;
    });

  const removerDoCarrinho = (id) => {
    setCarrinho((carrinho) => {
      const novoCarrinho = { ...carrinho };
      delete novoCarrinho[id];
      return novoCarrinho;
    });
  };

  const valueContext = {
    carrinho,
    produtos,
    mudarQtdNoCarrinho,
    adicionarCarrinho,
    removerDoCarrinho,
  };

  return (
    <div className="App">
      <ContextoCarrinhoProduto.Provider value={valueContext}>
        <Cabecalho />
        <Produtos />
      </ContextoCarrinhoProduto.Provider>
    </div>
  );
}
