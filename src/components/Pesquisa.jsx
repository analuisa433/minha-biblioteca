
function Pesquisa({ termo, setTermo, pesquisar, carregando }) {
  return (
    <form className="form-pesquisa" onSubmit={pesquisar}>
      <input
        type="text"
        placeholder="Digite o nome de um livro..."

        value={termo}

        onChange={(evento) => setTermo(evento.target.value)}
      />

      <button type="submit" disabled={carregando}>
        {carregando ? "Pesquisando..." : "Pesquisar"}
      </button>
    </form>
  );
}

export default Pesquisa;
