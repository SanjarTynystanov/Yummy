import { Link } from 'react-router-dom';
import { FaUtensils } from 'react-icons/fa';

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-orange-400 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center" aria-label="На главную">
          <FaUtensils className="mr-2" /> Yummy 
        </Link>
        <nav className="flex space-x-4">
          <Link to="/recipes" className="hover:text-orange-200" aria-label="Рецепты">
            Рецепты 🥗
          </Link>
          <Link to="/blog" className="hover:text-orange-200" aria-label="Блог">
            Блог 📝
          </Link>
          <Link to="/favorites" className="hover:text-orange-200" aria-label="Избранное">
            Избранное ❤️
          </Link>
          <Link to="/about" className="hover:text-orange-200" aria-label="О нас">
            О нас 🍴
          </Link>
          <Link to="/contact" className="hover:text-orange-200" aria-label="Контакты">
            Контакты 📧
          </Link>
          <Link to="/policy" className="hover:text-orange-200" aria-label="Политика конфиденциальности">
            Политика 🔒
          </Link>
          <Link to="/register" className="hover:text-orange-200" aria-label="Регистрация">
            Регистрация 📝
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;