import { Outlet } from "react-router-dom";
import Footer from "./Footer";
//import Header from "./Header";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
        <div>
            <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default Layout