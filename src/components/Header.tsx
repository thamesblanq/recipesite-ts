import { AlignLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { Button } from "@/components/ui/button"


const Header = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <header className="bg-white w-full h-20 flex items-center fixed top-0 border-b-2 border-black/50 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-2xl text-black font-lobster">
          Foodieland<span className="text-[#FF7426]">.</span>
        </Link>
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="font-inter text-black font-bold">Home</Link>
          <Link to="/recipe" className="font-inter text-black font-bold">Recipe</Link>
          <Link to="/blog" className="font-inter text-black font-bold">Blog</Link>
          <Link to="/contact" className="font-inter text-black font-bold">Contact</Link>
        </nav>
        <div className="hidden lg:flex items-center space-x-4">
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
        <AlignLeft
          className="text-2xl lg:hidden cursor-pointer hover:scale-110 transition duration-300 text-black"
          onClick={() => setShow(prev => !prev)}
        />
      </div>
      {show && <Dropdown setShow={setShow} />}
    </header>
  );
};

export default Header;
