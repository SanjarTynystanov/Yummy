import { Link } from 'react-router-dom';
import { FaUtensils, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  const isLoggedIn = !!loggedInUser.email;

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-orange-400 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold flex items-center" aria-label="На главную">
          <FaUtensils className="mr-2" /> Yummy 🍳
        </Link>
        <button
          className="sm:hidden text-2xl"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row absolute sm:static top-12 left-0 w-full sm:w-auto bg-orange-400 sm:bg-transparent p-4 sm:p-0 space-y-2 sm:space-y-0 sm:space-x-4`}>
          <Link to="/recipes" className="hover:text-orange-200" aria-label="Рецепты" onClick={() => setIsMenuOpen(false)}>
            Рецепты 🥗
          </Link>
          <Link to="/blog" className="hover:text-orange-200" aria-label="Блог" onClick={() => setIsMenuOpen(false)}>
            Блог 📝
          </Link>
          <Link to="/favorites" className="hover:text-orange-200" aria-label="Избранное" onClick={() => setIsMenuOpen(false)}>
            Избранное ❤️
          </Link>
          <Link to="/about" className="hover:text-orange-200" aria-label="О нас" onClick={() => setIsMenuOpen(false)}>
            О нас 🍴
          </Link>
          <Link to="/contact" className="hover:text-orange-200" aria-label="Контакты" onClick={() => setIsMenuOpen(false)}>
            Контакты 📧
          </Link>
          <Link to="/policy" className="hover:text-orange-200" aria-label="Политика конфиденциальности" onClick={() => setIsMenuOpen(false)}>
            Политика 🔒
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="hover:text-orange-200" aria-label="Личный кабинет" onClick={() => setIsMenuOpen(false)}>
                Личный кабинет 👤
              </Link>
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="hover:text-orange-200 text-left"
                aria-label="Выйти"
              >
                Выйти 🔓
              </button>
            </>
          ) : (
            <Link to="/register" className="hover:text-orange-200" aria-label="Регистрация" onClick={() => setIsMenuOpen(false)}>
              Регистрация 📝
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;