
function Historico({ livros }) {
  // Separa os livros de acordo com o status de leitura.
  const livrosQueroLer = livros.filter(
    (livro) => livro.status === "Quero ler"
  );

  const livrosLendo = livros.filter(
    (livro) => livro.status === "Lendo"
  );

  const livrosConcluidos = livros.filter(
    (livro) => livro.status === "Concluído"
  );

  function mostrarLivros(lista) {
    if (lista.length === 0) {
      return <p>Nenhum livro nesta categoria ainda.</p>;
    }

    return (
      <div className="lista-livros">
        {lista.map((livro) => (
          <div className="livro-card" key={livro.key}>
            {livro.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`}
                alt={`Capa de ${livro.title}`}
              />
            ) : (
              <div className="sem-capa">Sem capa</div>
            )}

            <h3>{livro.title}</h3>

            <p>
              Autor: {livro.author_name?.[0] || "Não informado"}
            </p>

            <div className="avaliacao-livro">
              <span className="estrelas">
                {"★".repeat(livro.nota)}
                {"☆".repeat(5 - livro.nota)}
              </span>

              <span className="nota">
                {livro.nota > 0
                  ? `${livro.nota}/5`
                  : "Não avaliado"}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="historico">
      <h2>Meu histórico de leitura</h2>

      <p className="descricao">
        Acompanhe sua jornada literária e organize suas próximas leituras.
      </p>

      <div className="resumo-historico">
        <div>
          <h3>{livrosQueroLer.length}</h3>
          <p>Quero ler</p>
        </div>

        <div>
          <h3>{livrosLendo.length}</h3>
          <p>Estou lendo</p>
        </div>

        <div>
          <h3>{livrosConcluidos.length}</h3>
          <p>Concluídos</p>
        </div>
      </div>

      <div className="categoria-historico">
        <h2>Minha lista de desejos</h2>
        <p>Livros que você pretende ler.</p>
        {mostrarLivros(livrosQueroLer)}
      </div>

      <div className="categoria-historico">
        <h2>Leituras em andamento</h2>
        <p>Livros que você está lendo atualmente.</p>
        {mostrarLivros(livrosLendo)}
      </div>

      <div className="categoria-historico">
        <h2>Leituras concluídas</h2>
        <p>Livros que já terminaram sua jornada com você.</p>
        {mostrarLivros(livrosConcluidos)}
      </div>
    </section>
  );
}

export default Historico;
