import { FaTag } from 'react-icons/fa';

function RecipeCard({ title,  image, category, id, onToggleFavorite, isFavorite }) {
  console.log('Пропсы RecipeCard:', { title, image, category, id, isFavorite });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-transform duration-300">
      <img
        src={image}
        alt={title || 'Изображение рецепта'}
        className="rounded-xl w-full h-56 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-3 truncate">{title || 'Без названия'}</h2>
      {category && (
        <div className="flex items-center text-gray-600 mb-4">
          <FaTag className="mr-2 text-orange-400" />
          <span>🥗 {category}</span>
        </div>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite({ idMeal: id, title, image, displayCategory: category });
        }}
        className={`w-full px-4 py-2 rounded-full font-medium transition-colors ${
          isFavorite ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-600'
        } hover:bg-orange-500 hover:text-white`}
        aria-label={isFavorite ? `Удалить ${title} из избранного` : `Добавить ${title} в избранное`}
      >
        {isFavorite ? '❤️ В избранном' : '🖤 Добавить в избранное'}
      </button>
    </div>
  );
}

export default RecipeCard;