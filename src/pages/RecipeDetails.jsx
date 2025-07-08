import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoryTranslations, areaTranslations, ingredientTranslations, instructionTranslations } from '../translations';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) {
          throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
        }
        const data = await response.json();
        console.log('Ответ API The Meal DB для деталей:', data);
        const meal = data.meals?.[0];
        if (!meal) {
          throw new Error('Рецепт не найден.');
        }
        setRecipe(meal);

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some(fav => fav.id === meal.idMeal));

        if (meal.strYoutube && (meal.strYoutube.includes('youtube.com') || meal.strYoutube.includes('youtu.be'))) {
          let embedUrl = meal.strYoutube;
          if (meal.strYoutube.includes('youtu.be')) {
            const videoId = meal.strYoutube.split('youtu.be/')[1]?.split('?')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
          } else if (meal.strYoutube.includes('youtube.com/watch?v=')) {
            const videoId = meal.strYoutube.split('v=')[1]?.split('&')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
          }
          setVideoUrl(embedUrl);
        } else {
          setVideoUrl(null);
        }
      } catch (error) {
        console.error('Ошибка при получении деталей рецепта:', error);
        setError('Не удалось загрузить рецепт. Попробуйте вернуться к списку рецептов.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const recipeData = {
      id: recipe.idMeal,
      title: recipe.strMeal,
      image: recipe.strMealThumb,
      category: categoryTranslations[recipe.strCategory?.toLowerCase()] || recipe.strCategory || 'Не указано'
    };
    const isCurrentlyFavorite = favorites.some(fav => fav.id === recipe.idMeal);
    let newFavorites;
    if (isCurrentlyFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== recipe.idMeal);
    } else {
      newFavorites = [...favorites, recipeData];
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isCurrentlyFavorite);
  };

  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal?.[`strIngredient${i}`];
      const measure = meal?.[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        const translatedIngredient = ingredientTranslations[ingredient.toLowerCase()] || ingredient;
        ingredients.push(`${measure || ''} ${translatedIngredient}`.trim());
      }
    }
    return ingredients;
  };

  const translateInstructions = (instructions) => {
    if (!instructions) return instructions;
    let translated = instructions;
    Object.entries(instructionTranslations).forEach(([en, ru]) => {
      const regex = new RegExp(`\\b${en}\\b`, 'gi');
      translated = translated.replace(regex, ru);
    });
    return translated;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {loading ? (
        <p className="text-center text-gray-500">🍳 Загрузка рецепта...</p>
      ) : error ? (
        <div className="text-center text-red-600">
          <p>{error}</p>
          <Link
            to="/recipes"
            className="inline-block mt-4 bg-orange-400 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-500 transition"
            aria-label="Вернуться к списку рецептов"
          >
            ⬅ Вернуться к рецептам
          </Link>
        </div>
      ) : recipe ? (
        <div className="bg-stone-50 rounded-2xl p-8 animate-fade-in">
          {/* Заголовок рецепта */}
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4 text-center">
            {recipe.strMeal || 'Без названия'} 🍴
          </h1>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Изображение рецепта */}
            <div className="md:w-1/2">
              <img
                src={recipe.strMealThumb || 'https://via.placeholder.com/400'}
                alt={recipe.strMeal || 'Изображение рецепта'}
                className="rounded-2xl w-full h-96 object-cover shadow-md"
              />
            </div>
            {/* Информация о рецепте */}
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg p-6 shadow mb-6">
                <p className="text-gray-600 mb-2">
                  🥗 <strong>Категория:</strong> {categoryTranslations[recipe.strCategory?.toLowerCase()] || recipe.strCategory || 'Не указано'}
                </p>
                <p className="text-gray-600 mb-2">
                  🌍 <strong>Кухня:</strong> {areaTranslations[recipe.strArea?.toLowerCase()] || recipe.strArea || 'Не указано'}
                </p>
                {recipe.strTags && (
                  <p className="text-gray-600 mb-2">
                    🏷 <strong>Теги:</strong> {recipe.strTags.split(',').map(tag => tag.trim()).join(', ')}
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <Link
                  to="/recipes"
                  className="inline-block bg-orange-400 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-500 transition"
                  aria-label="Вернуться к списку рецептов"
                >
                  ⬅ Вернуться к рецептам
                </Link>
                <button
                  onClick={toggleFavorite}
                  className={`inline-block px-6 py-3 rounded-full font-medium transition ${
                    isFavorite ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-600'
                  } hover:bg-orange-500 hover:text-white`}
                  aria-label={isFavorite ? `Удалить ${recipe.strMeal} из избранного` : `Добавить ${recipe.strMeal} в избранное`}
                >
                  {isFavorite ? '❤️ В избранном' : '🖤 Добавить в избранное'}
                </button>
              </div>
            </div>
          </div>

          {/* Секция видео */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">📹 Видео-рецепт</h2>
            {videoUrl ? (
              <div className="bg-white rounded-2xl p-4 shadow">
                <iframe
                  src={videoUrl}
                  title={`Видео-рецепт для ${recipe.strMeal || 'рецепта'}`}
                  className="w-full h-64 md:h-96 rounded-xl"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p className="text-gray-600">Видео для этого рецепта недоступно. 😔</p>
            )}
          </section>

          {/* Секция ингредиентов */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🥄 Ингредиенты</h2>
            <ul className="list-disc pl-6">
              {getIngredients(recipe).length > 0 ? (
                getIngredients(recipe).map((ingredient, index) => (
                  <li key={index} className="text-gray-600 mb-2">
                    {ingredient}
                  </li>
                ))
              ) : (
                <li className="text-gray-600">Ингредиенты не указаны.</li>
              )}
            </ul>
          </section>

          {/* Секция инструкций */}
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">📝 Инструкции</h2>
            {recipe.strInstructions ? (
              <ol className="list-decimal pl-6">
                {translateInstructions(recipe.strInstructions).split('\n').filter(step => step.trim()).map((step, index) => (
                  <li key={index} className="text-gray-600 mb-2">
                    {step}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-600">Инструкции не указаны.</p>
            )}
          </section>
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p>Рецепт не найден. 😔</p>
          <Link
            to="/recipes"
            className="inline-block mt-4 bg-orange-400 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-500 transition"
            aria-label="Вернуться к списку рецептов"
          >
            ⬅ Вернуться к рецептам
          </Link>
        </div>
      )}
    </div>
  );
}