import RecipeList from "./components/RecipeList"
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RecipeDetail from "./components/RecipeDetail";
import Content from "./components/Content";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  

  return (


    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Content />} />

        <Route path="recipe" >
            <Route index element={<RecipeList />} />
            <Route path=":id" element={<RecipeDetail />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />


      
      </Route>
    </Routes>

  )
}

export default App
