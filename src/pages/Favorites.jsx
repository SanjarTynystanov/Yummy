import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favRecipes);
  }, []);

  const removeFavorite = (id) => {
    const newFavorites = favorites.filter(recipe => recipe.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">❤️ Избранные рецепты</h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">У вас нет избранных рецептов. 😔 Добавьте рецепты с помощью кнопки ❤️!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-2xl shadow p-4 animate-fade-in">
              <Link to={`/recipes/${recipe.id}`}>
                <img
                  src={recipe.image || 'https://via.placeholder.com/150'}
                  alt={recipe.title || 'Изображение рецепта'}
                  className="rounded-xl w-full h-48 object-cover mb-4"
                />
                <h2 className="text-xl font-semibold mb-2 truncate">{recipe.title || 'Без названия'}</h2>
                <p className="text-gray-600">🥗 {recipe.category || 'Не указано'}</p>
              </Link>
              <button
                onClick={() => removeFavorite(recipe.id)}
                className="mt-2 bg-orange-400 text-white px-4 py-2 rounded-full hover:bg-orange-500 transition"
                aria-label={`Удалить ${recipe.title} из избранного`}
              >
                🗑 Удалить из избранного
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-6">
        <Link
          to="/recipes"
          className="inline-block bg-orange-400 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-500 transition"
          aria-label="Вернуться к списку рецептов"
        >
          ⬅ Вернуться к рецептам
        </Link>
      </div>
    </div>
  );
}
