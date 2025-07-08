import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="w-full bg-orange-400 text-white py-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-around items-center space-y-3 sm:space-y-0">

        {/* Навигация */}
        <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 text-xs sm:text-sm">
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
        </nav>

        {/* Копирайт */}
        <p className="text-xs sm:text-sm text-center">
          © 2025 Yummy. Все права защищены.
        </p>
      </div>
    </footer>
  );
}

export default Footer;