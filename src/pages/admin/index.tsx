import { useState, FormEvent, useEffect } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { FiTrash2, FiLink } from "react-icons/fi";
import { db } from "../../services/fireBaseConnection";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  //pra escolher a cor do texto do link
  const [textColor, setTextColor] = useState("#f1f1f1");

  //pra escolher a cor do background do link
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");

  //armazenar lista de links
  const [links, setLinks] = useState<LinksProps[]>([]);

  //observando e monitorando links no db em tempo real
  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista = [] as LinksProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
        //console.log(lista);
      });

      // adicionando lista ao useStates para exibir na tela
      setLinks(lista);
    });

    //desmontando o monitoramento
    return () => {
      unsub();
    };
  }, []);

  // funçao para criar link
  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos");
      return;
    }

    //cadastrando no DB
    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColor,
      created: new Date(),
    })
      .then(() => {
        //console.log("Cadastrado com sucesso");
        setNameInput("");
        setUrlInput("");
      })
      .catch((error) => {
        //console.log("erro ao cadastrar");
        console.log(error);
      });
  }

  //funçao para deletar
  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);

    await deleteDoc(docRef);
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form
        onSubmit={handleRegister}
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
      >
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">URL do Link</label>
        <Input
          type="url"
          placeholder="Digite url do link"
          value={urlInput}
          onChange={(event) => setUrlInput(event.target.value)}
        />
        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Fundo do Link
            </label>

            <input
              type="color"
              value={backgroundColorInput}
              onChange={(event) => setBackgroundColorInput(event.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Cor do Link
            </label>

            <input
              type="color"
              value={textColor}
              onChange={(event) => setTextColor(event.target.value)}
            />
          </div>
        </section>

        {nameInput !== "" && (
          //condicional para aparecer so quando houver algo digitado no input

          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">
              Veja como está ficando:
            </label>

            <article
              className="w-11/12 max-w-lg flex flex-col items-center rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p style={{ color: textColor }}>{nameInput}</p>
            </article>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 h-9 rounded-md text-white font-medium gap-2 flex justify-center items-center mb-7"
        >
          Cadastrar <FiLink size={18} color="#fff" />
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <p>{link.name}</p>
          <div>
            <button
              className="border border-dashed p-1 rounded bg-neutral-900"
              onClick={() => handleDeleteLink(link.id)}
            >
              <FiTrash2 size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
/* className="" */
