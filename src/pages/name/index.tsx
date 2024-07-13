import { useState, useEffect, FormEvent } from "react";
import { Input } from "../../components/input";
import { Header } from "../../components/Header";
import { db } from "../../services/fireBaseConnection";
import { FiTrash } from "react-icons/fi";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface NameProps {
  id: string;
  nome: string;
  sobreNome: string;
  colorNome: string;
  colorSobreNome: string;
}

export function Name() {
  const [nome, setNome] = useState("");
  const [sobreNome, setSobreNome] = useState("");
  const [colorNome, setColorNome] = useState("#f1f1f1");
  const [colorSobreNome, setColorSobreNome] = useState("#f1f1f1");

  //armazenar Nome e Sobrenome
  const [name, setName] = useState<NameProps[]>([]);

  //observando e monitorando nome no db em tempo real
  useEffect(() => {
    const nomeRef = collection(db, "nome");
    const queryName = query(nomeRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryName, (snapshot) => {
      const listaName = [] as NameProps[];

      snapshot.forEach((doc) => {
        listaName.push({
          id: doc.id,
          nome: doc.data().nome,
          sobreNome: doc.data().sobreNome,
          colorNome: doc.data().colorNome,
          colorSobreNome: doc.data().colorSobreNome,
        });
        //console.log(lista);
      });

      // adicionando lista ao useStates para exibir na tela
      setName(listaName);
      //console.log(listaName);
    });

    //desmontando o monitoramento
    return () => {
      unsub();
    };
  }, []);

  //funçao para deletar
  async function handleDeleteLink(id: string) {
    const nomeRef = doc(db, "nome", id);

    await deleteDoc(nomeRef);
  }

  // funçao para criar nome
  function handleName(e: FormEvent) {
    e.preventDefault();

    if (nome === "" || sobreNome === "") {
      alert("Preencha todos os campos");
      return;
    }

    //cadastrando no DB
    addDoc(collection(db, "nome"), {
      nome: nome,
      sobreNome: sobreNome,
      colorNome: colorNome,
      colorSobreNome: colorSobreNome,
      created: new Date(),
    })
      .then(() => {
        //console.log("Cadastrado com sucesso");
        setNome("");
        setSobreNome("");
      })
      .catch((error) => {
        console.log("erro ao cadastrar");
        console.log(error);
      });
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <form
        onSubmit={handleName}
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
      >
        <label className="text-white font-medium mt-2 mb-2">Nome</label>
        <Input
          placeholder="Digite o nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <div className="flex gap-2">
          <label className="text-white font-medium mt-2 mb-2">
            Cor do nome
          </label>
          <input
            type="color"
            value={colorNome}
            onChange={(event) => setColorNome(event.target.value)}
          />
        </div>

        <label className="text-white font-medium mt-2 mb-2">Sobrenome</label>
        <Input
          placeholder="Digite o nome"
          value={sobreNome}
          onChange={(event) => setSobreNome(event.target.value)}
        />
        <div className="flex gap-2">
          <label className="text-white font-medium mt-2 mb-2">
            Cor do sobrenome
          </label>
          <input
            type="color"
            value={colorSobreNome}
            onChange={(event) => setColorSobreNome(event.target.value)}
          />
        </div>

        {nome !== "" && (
          //condicional para aparecer so quando houver algo digitado no input
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md  mt-4">
            <label className="text-white font-medium mt-2 mb-3 vert">
              Veja como está ficando:
            </label>

            <article className="w-11/12 max-w-lg flex flex-col items-center roundedpx-1 py-3">
              <h1
                className="md:text-4xl  text-3xl font-bold text-white mt-2"
                style={{ color: colorNome }}
              >
                {nome}
                <span className="ml-2.5" style={{ color: colorSobreNome }}>
                  {sobreNome}
                </span>
              </h1>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center mb-7 mt-4"
        >
          Criar nome
        </button>
      </form>

      {name.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none border-gray-100/25 border"
        >
          <h1 style={{ color: link.colorNome }}>
            {link.nome}{" "}
            <span style={{ color: link.colorSobreNome }}>{link.sobreNome}</span>
          </h1>
          <button
            className="border border-dashed p-1 rounded bg-neutral-900"
            onClick={() => handleDeleteLink(link.id)}
          >
            <FiTrash size={18} color="#fff" />
          </button>
        </article>
      ))}
    </div>
  );
}
