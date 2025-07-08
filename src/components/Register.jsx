import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    // Простая валидация
    if (!name || !email || !password || !confirmPassword) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    console.log('Регистрация:', { name, email, password });
    // Здесь будет логика отправки данных на сервер в будущем
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setError('');
    alert('Регистрация успешна! (Загрузка)');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20 bg-stone-50 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center animate-fade-in">
        Регистрация 📝
      </h1>
      <p className="text-gray-600 text-center mb-8 text-lg">
        Присоединяйтесь к Yummy и начните кулинарное путешествие!
      </p>

      {/* Форма регистрации */}
      <section className="mb-12 max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-600 mb-1">
                Имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Ваше имя"
                required
              />
            </div>
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
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-600 mb-1">
                Подтверждение пароля 🔒
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Повторите пароль"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-orange-400 text-white rounded-full font-medium hover:bg-orange-500 transition-colors"
              aria-label="Зарегистрироваться"
            >
              Зарегистрироваться 🚀
            </button>
          </form>
          <p className="text-gray-600 text-center mt-4">
            Уже есть аккаунт?{' '}
            <Link
              to="/login"
              className="text-orange-400 hover:text-orange-500"
              aria-label="Перейти к входу"
            >
              Войти
            </Link>
          </p>
          <p className="text-gray-600 text-center mt-2">
            Регистрируясь, вы соглашаетесь с{' '}
            <Link
              to="/policy"
              className="text-orange-400 hover:text-orange-500"
              aria-label="Перейти к политике конфиденциальности"
            >
              Политикой конфиденциальности
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

export default Register;