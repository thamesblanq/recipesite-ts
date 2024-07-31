import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ setShow }: { setShow: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const user = localStorage.getItem('user');
  const userInfo = user ? JSON.parse(user) : null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setShow(false);
    navigate('/'); // Redirect to home or login page
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-start p-4 z-50 w-full">
      <button
        className="self-end mb-4 text-black"
        onClick={() => setShow(false)}
        aria-label="Close menu"
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
        {userInfo ? (
          <>
            <li className="border-b-2 border-black w-full">
              <button
                className="block px-4 py-2 text-black w-full"
                onClick={handleLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            </li>
            <li className="border-b-2 border-black w-full">
              <Link
                to={`/user/${userInfo.id}`}
                className="block px-4 py-2 text-black w-full"
                onClick={() => setShow(false)}
              >
                Profile
              </Link>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </div>
  );
};

export default Dropdown;
