import { Link } from "react-router-dom";
import footerBg from "../images/footerpic.png";

const Footer = () => {
  return (
    <footer className="px-6 my-4">
      <div className="flex flex-col items-center gap-10">

        {/* Subscription Section */}
        <div className="hidden md:block relative w-full h-64 rounded-lg overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${footerBg})` }}>
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className="text-black text-2xl md:text-4xl mb-4 font-inter font-semibold">Subscribe to our Newsletter</h1>
            <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-lg w-3/4 md:w-1/2 border border-slate-800"/>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="w-full p-6 rounded-lg flex flex-col md:flex-row items-center md:justify-between space-y-4">
          <h1 className="text-2xl text-black font-lobster">
            <Link to="/">Foodieland<span className="text-[#FF7426]">.</span></Link>
          </h1>
          <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 gap-x-4 justify-between">
            <li className="font-inter text-black font-bold"><Link to="/">Home</Link></li>
            <li className="font-inter text-black font-bold"><Link to="/recipe">Recipe</Link></li>
            <li className="font-inter text-black font-bold"><Link to="/blog">Blog</Link></li>
            <li className="font-inter text-black font-bold"><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
