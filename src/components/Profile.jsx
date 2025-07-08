import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState({ recipes: [], blog: [] });
  const navigate = useNavigate();

  useEffect(() => {
    // Проверка авторизации
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (!loggedInUser.email) {
      navigate('/login');
      return;
    }
    setUser(loggedInUser);

    // Загрузка избранного
    const recipesFavorites = JSON.parse(localStorage.getItem('recipesFavorites') || '[]');
    const blogFavorites = JSON.parse(localStorage.getItem('blogFavorites') || '[]');
    setFavorites({ recipes: recipesFavorites, blog: blogFavorites });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20 bg-stone-50 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center animate-fade-in">
        Личный кабинет 👤
      </h1>
      <p className="text-gray-600 text-center mb-8 text-lg">
        Добро пожаловать, {user.name}!
      </p>

      {/* Информация о пользователе */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ваши данные 📋
        </h2>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 mb-2">
            <strong>Имя:</strong> {user.name}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-orange-400 text-white rounded-full font-medium hover:bg-orange-500 transition-colors mt-4"
            aria-label="Выйти"
          >
            Выйти 🔓
          </button>
        </div>
      </section>

      {/* Избранные рецепты */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Избранные рецепты 🥗
        </h2>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          {favorites.recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {favorites.recipes.map(recipe => (
                <Link
                  key={recipe.idMeal}
                  to={`/recipes/${recipe.idMeal}`}
                  className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800">{recipe.strMeal}</h3>
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-40 object-cover rounded-lg mt-2"
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">У вас пока нет избранных рецептов.</p>
          )}
          <Link
            to="/recipes"
            className="inline-block mt-4 text-orange-400 hover:text-orange-500"
            aria-label="Перейти к рецептам"
          >
            Добавить рецепты 🥗
          </Link>
        </div>
      </section>

      {/* Избранные посты */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Избранные посты 📝
        </h2>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          {favorites.blog.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {favorites.blog.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">У вас пока нет избранных постов.</p>
          )}
          <Link
            to="/blog"
            className="inline-block mt-4 text-orange-400 hover:text-orange-500"
            aria-label="Перейти к блогу"
          >
            Добавить посты 📝
          </Link>
        </div>
      </section>

      {/* Изображение */}
      <section className="mb-12 max-w-lg mx-auto">
        <img
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba"
          alt="Кулинарный стол"
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

export default Profile;