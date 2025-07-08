import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Favorites() {
  const [favorites, setFavorites] = useState({ recipes: [], blog: [] });

  useEffect(() => {
    const recipesFavorites = JSON.parse(localStorage.getItem('recipesFavorites') || '[]');
    const blogFavorites = JSON.parse(localStorage.getItem('blogFavorites') || '[]');
    setFavorites({ recipes: recipesFavorites, blog: blogFavorites });
  }, []);

  return (
    <div className="w-full mx-auto px-4 py-6 pt-16 bg-stone-50 rounded-2xl sm:rounded-2xl shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-3 sm:mb-4 text-center animate-fade-in">
        Избранное ❤️
      </h1>
      <p className="text-gray-600 text-center mb-6 sm:mb-8 text-sm sm:text-lg">
        Ваши любимые рецепты и посты
      </p>

      {/* Избранные рецепты */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
          Избранные рецепты 🥗
        </h2>
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
          {favorites.recipes.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {favorites.recipes.map(recipe => (
                <Link
                  key={recipe.idMeal}
                  to={`/recipes/${recipe.idMeal}`}
                  className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">{recipe.strMeal}</h3>
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg mt-2"
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">У вас пока нет избранных рецептов.</p>
          )}
          <Link
            to="/recipes"
            className="inline-block mt-3 sm:mt-4 text-orange-400 hover:text-orange-500 text-sm sm:text-base"
            aria-label="Перейти к рецептам"
          >
            Добавить рецепты 🥗
          </Link>
        </div>
      </section>

      {/* Избранные посты */}
      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
          Избранные посты 📝
        </h2>
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
          {favorites.blog.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {favorites.blog.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="block p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">{post.title}</h3>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">У вас пока нет избранных постов.</p>
          )}
          <Link
            to="/blog"
            className="inline-block mt-3 sm:mt-4 text-orange-400 hover:text-orange-500 text-sm sm:text-base"
            aria-label="Перейти к блогу"
          >
            Добавить посты 📝
          </Link>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
          Готовы готовить? 🍳
        </h2>
        <Link
          to="/recipes"
          className="inline-block bg-orange-400 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium hover:bg-orange-500 transition-colors animate-pulse"
          aria-label="Перейти к рецептам"
        >
          Вернуться к рецептам 🥗
        </Link>
      </section>
    </div>
  );
}

export default Favorites;