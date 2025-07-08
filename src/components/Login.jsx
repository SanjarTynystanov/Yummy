import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Валидация
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    // Проверка пользователя
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.email === email && user.password === btoa(password));
    if (!user) {
      setError('Неверный email или пароль');
      return;
    }

    // Установка сессии
    localStorage.setItem('loggedInUser', JSON.stringify({ name: user.name, email }));
    console.log('Вход:', { name: user.name, email });
    setFormData({ email: '', password: '' });
    setError('');
    navigate('/profile');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20 bg-stone-50 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center animate-fade-in">
        Вход 🔐
      </h1>
      <p className="text-gray-600 text-center mb-8 text-lg">
        Войдите в свой аккаунт Yummy и продолжайте готовить!
      </p>

      {/* Форма входа */}
      <section className="mb-12 max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-600 mb-1">
                Email ✉️
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Ваш email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600 mb-1">
                Пароль 🔒
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Ваш пароль"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-orange-400 text-white rounded-full font-medium hover:bg-orange-500 transition-colors"
              aria-label="Войти"
            >
              Войти 🔐
            </button>
          </form>
          <p className="text-gray-600 text-center mt-4">
            Нет аккаунта?{' '}
            <Link
              to="/register"
              className="text-orange-400 hover:text-orange-500"
              aria-label="Перейти к регистрации"
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </section>

      {/* Изображение */}
      <section className="mb-12 max-w-lg mx-auto">
        <img
          src="https://images.unsplash.com/photo-1496116218417-1a781b1c416c"
          alt="Кулинарные ингредиенты"
          className="rounded-xl w-full h-64 object-cover"
        />
      </section>

      {/* Призыв к действию */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Готовы готовить? 🍳
        </h2>
        <Link
          to="/recipes"
          className="inline-block bg-orange-400 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-500 transition-colors animate-pulse"
          aria-label="Перейти к рецептам"
        >
          Вернуться к рецептам 🥗
        </Link>
      </section>
    </div>
  );
}

export default Login;