import { Link } from "react-router-dom"
import { X } from "lucide-react"
  



const Dropdown = ({ setShow }: { setShow: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const content = (
        <>
<div className="fixed inset-0 bg-white flex flex-col items-start p-4 z-50 w-full">
      <button 
        className="self-end mb-4 text-black"
        onClick={() => setShow(false)}
      >
        <X className="w-8 h-8" />
      </button>
      <ul className="flex flex-col gap-4 w-full">
        <li className="border-b-2 border-black w-full">
          <Link
            to="/"
            className="block px-4 py-2 text-black w-full"
            onClick={() => setShow(false)}
          >
            Home
          </Link>
        </li>
        <li className="border-b-2 border-black w-full">
          <Link
            to="/recipe"
            className="block px-4 py-2 text-black w-full"
            onClick={() => setShow(false)}
          >
            Recipe
          </Link>
        </li>
        <li className="border-b-2 border-black w-full">
          <Link
            to="/blog"
            className="block px-4 py-2 text-black w-full"
            onClick={() => setShow(false)}
          >
            Blog
          </Link>
        </li>
        <li className="border-b-2 border-black w-full">
          <Link
            to="/contact"
            className="block px-4 py-2 text-black w-full"
            onClick={() => setShow(false)}
          >
            Contact
          </Link>
        </li>
        <li className="border-b-2 border-black w-full">
          <Link
            to="/login"
            className="block px-4 py-2 text-black w-full"
            onClick={() => setShow(false)}
          >
            Login
          </Link>
        </li>
        <li className="border-b-2 border-black w-full">
          <Link
            to="/signup"
            className="block px-4 py-2 text-black w-full"
            onClick={() => setShow(false)}
          >
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
        </>
    )

  return content
}

export default Dropdown