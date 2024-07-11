import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { auth } from "../../services/fireBaseConnection";
import { signOut } from "firebase/auth";

//funçao para deslogar
async function handleLogout() {
  await signOut(auth);
}

export function Header() {
  return (
    <header className="w-full max-w-2xl mt-4 px-1">
      <nav className="w-full bg-white h-12 flex items-center justify-between rounded-md px-3">
        <div className="flex gap-4 font-medium">
          <Link to={"/"}>Links</Link>
          <Link to={"/login"}>Login</Link>
        </div>

        <button onClick={handleLogout}>
          <BiLogOut size={20} color="#db2629" />
        </button>
      </nav>
    </header>
  );
}
/* className="" */
