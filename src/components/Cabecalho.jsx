
function Cabecalho({ telaAtual, mudarTela }) {
  return (
    <header className="cabecalho">
      <h1>Minha Biblioteca</h1>

      <p>Um espaço para organizar seus livros.</p>

      <nav>
        <button
          onClick={() => mudarTela("pesquisa")}
          className={telaAtual === "pesquisa" ? "ativo" : ""}
        >
          Pesquisar
        </button>

        <button
          onClick={() => mudarTela("biblioteca")}
          className={telaAtual === "biblioteca" ? "ativo" : ""}
        >
          Minha biblioteca
        </button>

        <button
          onClick={() => mudarTela("historico")}
          className={telaAtual === "historico" ? "ativo" : ""}
        >
          Histórico
        </button>
      </nav>
    </header>
  );
}

export default Cabecalho;
