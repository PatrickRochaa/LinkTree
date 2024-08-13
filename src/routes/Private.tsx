import { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/fireBaseConnection";
import { onAuthStateChanged } from "firebase/auth";

interface PrivateProps {
  children: ReactNode;
}

// proteçao
export function Private({ children }: PrivateProps): any {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.displayName,
          email: user?.email,
        };

        //salvando no localStorage
        localStorage.setItem("@reactlinks", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });

    // removendo funçao que monitora a rota do private
    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <div></div>;
  }

  // se o usuario nao tiver logado ou nao tem conta
  if (!signed) {
    return <Navigate to={"/login"} />;
  }

  return children;
}
