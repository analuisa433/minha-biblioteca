
import { useState } from "react";
import Cabecalho from "./components/Cabecalho.jsx";
import Pesquisa from "./components/Pesquisa.jsx";
import Livro from "./components/Livro.jsx";
import MinhaBiblioteca from "./components/MinhaBiblioteca.jsx";
import Historico from "./components/Historico.jsx";
import "./App.css";

function App() {
  const [telaAtual, setTelaAtual] = useState("pesquisa");

  const [termo, setTermo] = useState("");

  const [livrosEncontrados, setLivrosEncontrados] = useState([]);

  const [minhaBiblioteca, setMinhaBiblioteca] = useState([]);

  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function pesquisar(evento) {
    evento.preventDefault();

    if (termo.trim() === "") {
      setMensagem("Digite o nome de um livro.");
      return;
    }

    setCarregando(true);
    setMensagem("");

    try {
      const resposta = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(termo)}&limit=12`
      );

      if (!resposta.ok) {
        throw new Error("Erro ao buscar livros.");
      }

      // Converte a resposta da API para um objeto JavaScript.
      const dados = await resposta.json();

      // Guarda os livros encontrados. Se não houver resultados, usa uma lista vazia.
      const livros = dados.docs || [];
      setLivrosEncontrados(livros);

      if (livros.length === 0) {
        setMensagem("Nenhum livro encontrado.");
      }
    } catch (erro) {
      // Exibe uma mensagem caso a pesquisa não consiga ser realizada.
      setMensagem("Não foi possível buscar os livros. Tente novamente.");
    } finally {
      // Encerra o carregamento mesmo se acontecer algum erro.
      setCarregando(false);
    }
  }

  // Adiciona um livro à biblioteca, evitando que ele seja repetido.
  function adicionarLivro(livro) {
    const jaExiste = minhaBiblioteca.some(
      (item) => item.key === livro.key
    );

    if (!jaExiste) {
      setMinhaBiblioteca([
        ...minhaBiblioteca,
        { ...livro, status: "Quero ler", nota: 0 }
      ]);
    }
  }

  // Atualiza o status de leitura de um livro específico.
  function alterarStatus(chave, novoStatus) {
    const livrosAtualizados = minhaBiblioteca.map((livro) => {
      if (livro.key === chave) {
        return { ...livro, status: novoStatus };
      }

      return livro;
    });

    setMinhaBiblioteca(livrosAtualizados);
  }

  // Atualiza a avaliação de um livro.
  function avaliarLivro(chave, novaNota) {
    const livrosAtualizados = minhaBiblioteca.map((livro) => {
      if (livro.key === chave) {
        return { ...livro, nota: novaNota };
      }

      return livro;
    });

    setMinhaBiblioteca(livrosAtualizados);
  }

 
  function removerLivro(chave) {
    const livrosAtualizados = minhaBiblioteca.filter(
      (livro) => livro.key !== chave
    );

    setMinhaBiblioteca(livrosAtualizados);
  }

  return (
    <div className="aplicativo">
      <Cabecalho
        telaAtual={telaAtual}
        mudarTela={setTelaAtual}
      />

      <main className="conteudo">
        {telaAtual === "pesquisa" ? (
          <>
            <h2>Encontre sua próxima leitura</h2>

            <p className="descricao">
              Pesquise livros e organize suas leituras em um só lugar.
            </p>

            <Pesquisa
              termo={termo}
              setTermo={setTermo}
              pesquisar={pesquisar}
              carregando={carregando}
            />

            {mensagem && (
              <p className="mensagem">{mensagem}</p>
            )}

            <div className="lista-livros">
              {livrosEncontrados.map((livro) => (
                <Livro
                  key={livro.key}
                  livro={livro}
                  adicionar={adicionarLivro}
                  jaAdicionado={minhaBiblioteca.some(
                    (item) => item.key === livro.key
                  )}
                />
              ))}
            </div>
          </>
        ) : telaAtual === "biblioteca" ? (
          <MinhaBiblioteca
            livros={minhaBiblioteca}
            alterarStatus={alterarStatus}
            avaliarLivro={avaliarLivro}
            removerLivro={removerLivro}
          />
        ) : (
          <Historico livros={minhaBiblioteca} />
        )}
      </main>

      <footer className="rodape">
        <p>Minha Biblioteca © 2026</p>
        <p>Desenvolvido por Ana Luisa Ramos</p>
      </footer>
    </div>
  );
}

export default App;
