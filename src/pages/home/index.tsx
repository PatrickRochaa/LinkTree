import { useState, useEffect } from "react";
import { db } from "../../services/fireBaseConnection";
import { getDocs, collection, orderBy, query } from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface NameProps {
  id: string;
  nome: string;
  sobreNome: string;
  colorNome: string;
  colorSobreNome: string;
}

export function Links() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [nome, setNome] = useState("Nome");
  const [sobreNome, setSobreNome] = useState("Sobrenome");
  const [colorNome, setColorNome] = useState("");
  const [colorSobreNome, setColorSobreNome] = useState("");
  const [dados, setDados] = useState<NameProps[]>([]);

  //buscando links criado
  useEffect(() => {
    function loadinLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
        const lista = [] as LinkProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          });
        });
        setLinks(lista);
      });
    }
    loadinLinks();
  }, []);

  //buscando nome criado
  useEffect(() => {
    function loadingNome() {
      const nomeRef = collection(db, "usuario");
      const queryNome = query(nomeRef, orderBy("created", "asc"));

      getDocs(queryNome).then((snapshot) => {
        const listaNome = [] as NameProps[];

        snapshot.forEach((doc) => {
          listaNome.push({
            id: doc.id,
            nome: doc.data().nome,
            sobreNome: doc.data().sobreNome,
            colorNome: doc.data().colorNome,
            colorSobreNome: doc.data().colorSobreNome,
          });
        });
        setDados(listaNome);
      });
    }
    loadingNome();
  }, []);

  //exibindo nome
  useEffect(() => {
    dados.map((dados) => {
      setNome(dados.nome);
      setSobreNome(dados.sobreNome);
      setColorNome(dados.colorNome);
      setColorSobreNome(dados.colorSobreNome);
    });
  });

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1
        className="md:text-4xl  text-3xl font-bold text-white mt-20"
        style={{ color: colorNome }}
      >
        {nome} <span style={{ color: colorSobreNome }}>{sobreNome}</span>
      </h1>

      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>
      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            key={link.id}
            style={{ backgroundColor: link.bg }}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
          >
            <a href={link.url} target="_blank">
              <p className="text-base md:text-lg" style={{ color: link.color }}>
                {link.name}
              </p>
            </a>
          </section>
        ))}
      </main>
    </div>
  );
}

{
  /* <h1
key={user.id}
className="md:text-4xl  text-3xl font-bold text-white mt-20"
style={{ color: user.colorNome }}
>
{user.nome}{" "}
<span style={{ color: user.colorSobreNome }}>{user.sobreNome}</span>
</h1> */
}
