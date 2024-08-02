import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLogoutMutation } from "@/features/auth/authApi";
import { User } from "@/types";

const Dropdown = ({ setShow }: { setShow: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [userInfo, setUserInfo] = useState<User | null>(() => {
    const user = localStorage.getItem('session');
    return user ? JSON.parse(user) : null;
  });
  //console.log(userInfo?.$id)
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const user = localStorage.getItem('session');
    setUserInfo(user ? JSON.parse(user) : null);
  }, []);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem('session');
      setUserInfo(null);
      setShow(false);
      navigate('/'); // Redirect to home or login page
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem('session'); // Clear localStorage even if logout fails
      setUserInfo(null);
      setShow(false);
      navigate('/');
    }
  };

  const handleProfile = () => {
    if (userInfo) {
      setShow(false)
      navigate(`/user/${userInfo.$id}`);
      //window.location.href = `/user/${userInfo.$id}`;
    }
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
        {userInfo ? <span className="font-inter text-black font-bold">{userInfo.email}</span> : <span></span>}
        
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
{/*         <li className="border-b-2 border-black w-full">
          <Link
            to="/blog"
            className="block px-4 py-2 text-black w-full"
            onClick={() => setShow(false)}
          >
            Blog
          </Link>
        </li> */}
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
                className="w-max block px-4 py-2 text-black"
                onClick={handleLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            </li>
            <li className="border-b-2 border-black w-full cursor-pointer"
            onClick={handleProfile}
            >
                <span  className="w-max block px-4 py-2 text-black">Profile</span>
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
