import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20 bg-stone-50 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center animate-fade-in">
        Вход 🔐
      </h1>
      <p className="text-gray-600 text-center mb-8 text-lg">
        Страница входа находится в разработке. Скоро вы сможете войти в свой аккаунт Yummy! 😊
      </p>
      <div className="text-center">
        <Link
          to="/recipes"
          className="inline-block bg-orange-400 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-500 transition-colors animate-pulse"
          aria-label="Перейти к рецептам"
        >
          Вернуться к рецептам 🥗
        </Link>
      </div>
    </div>
  );
}

export default Login;