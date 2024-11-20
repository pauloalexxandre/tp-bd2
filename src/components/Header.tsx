import { useAuth } from "@/app/context/AuthContext";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export function Header() {
  function onClick() {
    console.log("Hello World");
  }
  const { user, logout } = useAuth(); // Obtenha o estado de autenticação e a função de logout

  return (
    <>
      <nav
        id="nav-website"
        className="fixed top-0 z-50 flex  justify-center w-full items-center bg-[#48484a] text-white py-4 "
        onClick={() => onClick()}
      >
        <Link href={"/"}   className=" ml-10 min-w-20 flex w-auto px-2 py-1 bg-gray-700 rounded items-center justify-center hover:bg-gray-900 duration-300 ">
                Mapa
        </Link>
        <ul className="flex items-center justify-center gap-5 w-full ">
            <ul className="flex gap-4 duration-300" >
              <li>
                <a  href="https://github.com/pauloalexxandre"  target="_blank" className="hover:text-blue-400 duration-200">Github</a>
              </li>
              <li>
                <a  href="https://github.com/pauloalexxandre/tp-bd2"   target="_blank" className="hover:text-blue-400 duration-200">API</a>
              </li>
              <li>
                <a
                  href="https://github.com/pauloalexxandre/tp-bd2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 duration-200"
                >
                  FrontEnd
                </a>
              </li>
              <li>
                <a  href="https://github.com/pauloalexxandre/tp-bd2"  target="_blank" className="hover:text-blue-400 duration-200">BackEnd</a>
              </li>
              <li>
                <a  href="https://react-leaflet.js.org/"  target="_blank" className="hover:text-blue-400 duration-200">React LeafLet</a>
              </li>
              <li>
                <a  href="https://www.mysql.com/"  target="_blank" className="hover:text-blue-400 duration-200">
                  MySQL
                </a>
              </li>
              <li>
                <a  href="https://nextjs.org/" target="_blank"  className="hover:text-blue-400 duration-200">NextJs</a>
              </li>
            </ul>
           
          {/* Verifique se o usuário está logado */}
         
        </ul>
        <div className="pr-10 flex w-auto">
            {user ? (
              <div className="flex items-center gap-5">
                <div className="flex"><User className="w-6 h-6" />
                <span>{user}</span>
                </div>
                <button onClick={logout} className="flex items-center gap-1 hover:text-blue-400 duration-200">
                  <LogOut className="w-4 h-4" />
                  
                </button>
              </div>
            ) : (
              <Link href={"/login"}   className=" min-w-20 flex w-auto px-2 py-1 bg-gray-700 rounded items-center justify-center hover:bg-gray-900 duration-300 ">
                Sign in
              </Link>
            )}
          </div>
      </nav>
    </>
  );
}
