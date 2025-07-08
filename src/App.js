import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';
import RecipeList from './components/RecipeList';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetails';
import About from './pages/about';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Register from './components/Register';
import Profile from './components/Profile';
import Login from './components/Login';
import { categoryTranslations } from './translations';

// Защита маршрута
const ProtectedRoute = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  return loggedInUser.email ? children : <Navigate to="/login" />;
};

// Заглушки для категорий (раскомментируйте, если нужны)
const Breakfast = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
    <h1 className="text-3xl font-bold text-orange-600">{categoryTranslations['breakfast']}</h1>
    <p className="text-gray-600 mt-4">Страница находится в разработке. Скоро здесь появятся рецепты завтраков! 🥐</p>
  </div>
);
const Dinner = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
    <h1 className="text-3xl font-bold text-orange-600">Ужины</h1>
    <p className="text-gray-600 mt-4">Страница находится в разработке. Скоро здесь появятся рецепты ужинов! 🍲</p>
  </div>
);
const Desserts = () => (
  <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
    <h1 className="text-3xl font-bold text-orange-600">{categoryTranslations['dessert']}</h1>
    <p className="text-gray-600 mt-4">Страница находится в разработке. Скоро здесь появятся рецепты десертов! 🍰</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;