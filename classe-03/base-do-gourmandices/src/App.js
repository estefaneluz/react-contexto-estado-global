import { createContext, useState } from "react";
import { Cabecalho } from "./componentes/Cabecalho";
import { Produtos } from "./componentes/Produtos";
import { produtos } from "./utils/produtos";
import "./styles.css";

export const ContextoCarrinhoProduto = createContext();

export default function App() {
  const [carrinho, setCarrinho] = useState({});
  const incrementarCarrinho = (id, qtd) =>
    setCarrinho((carrinho) => {
      const novoCarrinho = { ...carrinho };
      novoCarrinho[id] = (novoCarrinho[id] || 0) + qtd;

      if (novoCarrinho[id] === 0) {
        delete novoCarrinho[id];
      }
      return novoCarrinho;
    });

  const adicionarCarrinho=(id) => incrementarCarrinho(id, 1); 

  const valueContext = {carrinho, produtos, incrementarCarrinho, adicionarCarrinho}
  return (
    <div className="App">
    <ContextoCarrinhoProduto.Provider value={valueContext}>
      <Cabecalho/>
      <Produtos/>
    </ContextoCarrinhoProduto.Provider>
    </div>
  );
}
