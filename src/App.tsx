import RecipeList from "./components/RecipeList"
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RecipeDetail from "./components/RecipeDetail";
import Content from "./components/Content";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import CategoryPage from "./components/CategoriesPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Content />} />

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="contact" element={<Contact />} />
          <Route path="category/:category" element={<CategoryPage />} />
          <Route path="recipe" element={<RecipeList />} />
          <Route path="recipe/:id" element={<RecipeDetail />} />


        
        </Route>
      </Routes>
    </>



  )
}

export default App
