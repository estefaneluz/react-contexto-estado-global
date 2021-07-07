import { Fragment, useContext } from "react";
import { ContextoCarrinhoProduto } from "../App";
import { Produto } from "./Produto";

export function Produtos() {
  const { produtos } = useContext(ContextoCarrinhoProduto);
  const secoes = new Set(produtos.map((p) => p.secao));
  return (
    <main className="produtos">
      {[...secoes].map((secao) => (
        <Fragment key={secao}>
          <h2>{secao}</h2>
          <ul className="secao">
            {produtos
              .filter((p) => p.secao === secao)
              .map((produto) => (
                <li key={produto.id}>
                  <Produto
                    {...produto}
                  />
                </li>
              ))}
          </ul>
        </Fragment>
      ))}
    </main>
  );
}
