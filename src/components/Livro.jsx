
function Livro({ livro, adicionar, jaAdicionado }) {
  return (
    <div className="livro-card">
      {livro.cover_i ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`}
          alt={`Capa do livro ${livro.title}`}
        />
      ) : (
        <div className="sem-capa">Sem capa</div>
      )}

      <h3>{livro.title}</h3>

      <p>
        Autor:{" "}
        {livro.author_name && livro.author_name.length > 0
          ? livro.author_name[0]
          : "Não informado"}
      </p>

      <p>
        Ano: {livro.first_publish_year || "Não informado"}
      </p>

      <button
        onClick={() => adicionar(livro)}
        disabled={jaAdicionado}
      >
        {jaAdicionado ? "Adicionado" : "Adicionar à biblioteca"}
      </button>
    </div>
  );
}

export default Livro;
