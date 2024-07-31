import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Content from './components/Content';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import CategoryPage from './components/CategoriesPage';
import ScrollToTop from './components/ScrollToTop';
import UpdateUser from './components/UpdateUser';
import DeleteUser from './components/DeleteUser';
import CreateRecipe from './components/CreateRecipe';
import UserPage from './components/UserPage';
import UpdateRecipe from './components/UpdateRecipe';
import ProtectedRoute from './components/ProtectedRoute'; // Import your ProtectedRoute

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
          <Route path="recipe/create" element={
            <ProtectedRoute>
              <CreateRecipe />
            </ProtectedRoute>
          } />
          <Route path="recipe/:id/update" element={
            <ProtectedRoute>
              <UpdateRecipe />
            </ProtectedRoute>
          } />
          <Route path="user/:userId" element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          } />
          <Route path="user/:userId/update" element={
            <ProtectedRoute>
              <UpdateUser />
            </ProtectedRoute>
          } />
          <Route path="user/:userId/delete" element={
            <ProtectedRoute>
              <DeleteUser />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
