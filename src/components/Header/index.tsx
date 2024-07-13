import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/fireBaseConnection";
import { signOut } from "firebase/auth";

export function Header() {
  const navigate = useNavigate();

  //funçao para deslogar
  async function handleLogout() {
    await signOut(auth);
    navigate("/", { replace: true });
  }
  return (
    <header className="w-full max-w-2xl mt-4 px-1">
      <nav className="w-full bg-white h-12 flex items-center justify-between rounded-md px-3">
        <div className="flex gap-4 font-medium">
          <Link to={"/Links"}>Links Criados</Link>
          <Link to={"/admin"}>Criar Link</Link>
          <Link to={"/name"}>Criar Nome</Link>
        </div>

        <button onClick={handleLogout}>
          <BiLogOut size={20} color="#db2629" />
        </button>
      </nav>
    </header>
  );
}
/* className="" */
