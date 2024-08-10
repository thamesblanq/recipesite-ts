import { AlignLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Dropdown from "./Dropdown";
import { Button } from "./ui/button";
import { useLogoutMutation } from "@/features/auth/authApi";
import { User } from "@/types";

const Header = () => {
  const [show, setShow] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(() => {
    const user = localStorage.getItem('session');
    return user ? JSON.parse(user) : null;
  });

  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const updateUserInfo = useCallback(() => {
    const user = localStorage.getItem('session');
    setUserInfo(user ? JSON.parse(user) : null);
  }, []);

  useEffect(() => {
    window.addEventListener('storage', updateUserInfo);
    return () => {
      window.removeEventListener('storage', updateUserInfo);
    };
  }, [updateUserInfo]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      console.log('Logout successful');
      localStorage.removeItem('session');
      console.log('localStorage cleared');
      setUserInfo(null);
      navigate('/'); // Redirect to home or login page
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem('session'); // Clear localStorage even if logout fails
      console.log('localStorage cleared on error');
      setUserInfo(null);
      navigate('/');
    }
  };

  const handleProfile = () => {
    if (userInfo) {
      navigate(`/user/${userInfo.$id}`);
      //window.location.href = `/user/${userInfo.$id}`;
    }
  };

  return (
    <header className="bg-white w-full h-20 flex items-center fixed top-0 border-b-2 border-black/50 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-2xl text-black font-lobster">
          Foodieland<span className="text-[#FF7426]">.</span>
        </Link>
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="font-inter text-black font-bold">Home</Link>
          <Link to="/recipe" className="font-inter text-black font-bold">Recipe</Link>
          {/* <Link to="/blog" className="font-inter text-black font-bold">Blog</Link> */}
          <Link to="/contact" className="font-inter text-black font-bold">Contact</Link>
        </nav>
        <div className="hidden lg:flex items-center space-x-4">
          {userInfo ? (
            <>
              <span className="font-inter text-black font-bold">{userInfo.email}</span>
              <Button onClick={handleLogout} className="bg-red-500 text-white">Logout</Button>
              <Button className="bg-red-500 text-white" onClick={handleProfile}>
                Profile
              </Button>
            </>
          ) : (
            <>
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
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
