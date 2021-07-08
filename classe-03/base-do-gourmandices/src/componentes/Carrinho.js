import { formatarDinheiro } from "../utils/dinheiro";
import { ContextoCarrinhoProduto } from '../App'
import { useContext } from "react";

export function Carrinho({
  aberto,
  setAberto
}) 
{
  const {carrinho, produtos, mudarQtdNoCarrinho} = useContext(ContextoCarrinhoProduto)

  return (
    <div
      className={`carrinho ${aberto ? "aberto" : ""}`}
      onClick={(ev) => {
        if (aberto) {
          ev.stopPropagation();
        }
      }}
    >
      <h2>
        Carrinho <button onClick={() => setAberto(false)}>&times;</button>
      </h2>
      <ul>
        {Object.entries(carrinho).map(([id, qtd]) => {
          const produto = produtos.find((p) => p.id === +id);
          return (
            <li key={id}>
              <span className="nome">{produto.nome}</span>{" "}
              <span>
                <input
                  type="number"
                  value={qtd}
                  min={1}
                  onChange={(ev) =>
                    mudarQtdNoCarrinho(id, ev.target.valueAsNumber - qtd)
                  }
                />{" "}
                &times; R${formatarDinheiro(produto.preco)} ={" "}
                {formatarDinheiro(qtd * produto.preco)}
              </span>
              <button
                className="botao-carrinho"
                aria-label="Remover do carrinho"
                onClick={() => mudarQtdNoCarrinho(id, -qtd)}
              >
                &times;
              </button>
            </li>
          );
        })}
      </ul>
      <hr />
      <div>
        Total: R$
        {formatarDinheiro(
          Object.entries(carrinho)
            .map(([id, qtd]) => qtd * produtos.find((p) => p.id === +id).preco)
            .reduce((soma, preco) => soma + preco, 0)
        )}
      </div>
    </div>
  );
}
