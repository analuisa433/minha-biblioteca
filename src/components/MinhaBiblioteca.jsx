
import { useState } from "react";

function MinhaBiblioteca({
  livros,
  alterarStatus,
  avaliarLivro,
  removerLivro
}) {
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  return (
    <section>
      <h2>Minha estante</h2>

      <p className="descricao">
        Seus livros reunidos em um só lugar.
      </p>

      {livros.length === 0 ? (
        <p>
          Sua estante ainda está vazia. Pesquise e adicione livros!
        </p>
      ) : (
        <div className="estante">
          {livros.map((livro) => (
            <div className="livro-estante" key={livro.key}>
              <button
                className="botao-capa"
                onClick={() => setLivroSelecionado(livro)}
              >
                {livro.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`}
                    alt={`Capa de ${livro.title}`}
                  />
                ) : (
                  <div className="sem-capa">Sem capa</div>
                )}
              </button>

              <p>{livro.title}</p>
            </div>
          ))}
        </div>
      )}

      {/* O modal só aparece quando existe um livro selecionado. */}
      {livroSelecionado && (
        <div className="modal-fundo">
          <div className="modal-livro">

            <button
              className="fechar-modal"
              onClick={() => setLivroSelecionado(null)}
            >
              X
            </button>

            {livroSelecionado.cover_i ? (
              <img
                className="capa-modal"
                src={`https://covers.openlibrary.org/b/id/${livroSelecionado.cover_i}-M.jpg`}
                alt={`Capa de ${livroSelecionado.title}`}
              />
            ) : (
              <div className="sem-capa">Sem capa</div>
            )}

            <div className="informacoes-livro">
              <h2>{livroSelecionado.title}</h2>

              <p>
                Autor: {livroSelecionado.author_name?.[0] || "Não informado"}
              </p>

              <p>
                Ano: {livroSelecionado.first_publish_year || "Não informado"}
              </p>

              <label>Status da leitura:</label>

              <select
                value={livroSelecionado.status}
                onChange={(evento) => {
                  const novoStatus = evento.target.value;

                  // Atualiza o livro na lista principal.
                  alterarStatus(livroSelecionado.key, novoStatus);

                  // Atualiza também o livro que está aberto no modal.
                  setLivroSelecionado({
                    ...livroSelecionado,
                    status: novoStatus
                  });
                }}
              >
                <option value="Quero ler">Quero ler</option>
                <option value="Lendo">Estou lendo</option>
                <option value="Concluído">Concluído</option>
              </select>

              <label>Avaliação:</label>

              <select
                value={livroSelecionado.nota}
                onChange={(evento) => {
                  // Converte o valor selecionado para número.
                  const nota = Number(evento.target.value);

                  avaliarLivro(livroSelecionado.key, nota);

                  setLivroSelecionado({
                    ...livroSelecionado,
                    nota: nota
                  });
                }}
              >
                <option value="0">Sem avaliação</option>
                <option value="1">1 estrela</option>
                <option value="2">2 estrelas</option>
                <option value="3">3 estrelas</option>
                <option value="4">4 estrelas</option>
                <option value="5">5 estrelas</option>
              </select>

              <button
                onClick={() => {
                  removerLivro(livroSelecionado.key);
                  setLivroSelecionado(null);
                }}
              >
                Remover da biblioteca
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MinhaBiblioteca;
