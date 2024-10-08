import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { Input } from "../../components/input";
import { auth } from "../../services/fireBaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //funçao para fazer login
  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("preencha todos os campos");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        //console.log("logado com sucesso");
        navigate("/admin", { replace: true });
      })
      .catch((error) => {
        console.log("erro ao fazer login");
        console.log(error);
        alert("erro ao fazer login");
      });
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-3"
      >
        <Input
          placeholder="Digite seu email..."
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <Input
          placeholder="********"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button
          type="submit"
          className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
