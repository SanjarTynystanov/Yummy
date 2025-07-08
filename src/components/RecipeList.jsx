import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { categoryTranslations } from '../translations';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let allRecipes = [];

        if (searchQuery) {
          // Поиск по названию
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`);
          if (!response.ok) throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
          const data = await response.json();
          console.log('Ответ поиска:', data);

          if (data.meals && data.meals.length > 0) {
            allRecipes = data.meals
              .filter(meal => meal && meal.strMeal && meal.strMealThumb && meal.idMeal)
              .map(meal => ({
                idMeal: meal.idMeal,
                title: meal.strMeal.trim(),
                time: 'Не указано',
                category: meal.strCategory?.toLowerCase() || 'miscellaneous',
                displayCategory: categoryTranslations[meal.strCategory?.toLowerCase()] || meal.strCategory || 'Разное',
                image: meal.strMealThumb || 'https://via.placeholder.com/150'
              }));
          }
        } else {
          // Загрузка по категориям
          const apiCategories = [
            'Beef', 'Chicken', 'Dessert', 'Lamb', 'Seafood', 'Pasta', 'Pork',
            'Vegetarian', 'Breakfast', 'Miscellaneous', 'Vegan', 'Starter'
          ];

          const promises = apiCategories.map(cat =>
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
              .then(res => {
                if (!res.ok) throw new Error(`Ошибка HTTP! Статус: ${res.status}`);
                return res.json();
              })
              .catch(err => {
                console.warn(`Ошибка загрузки категории ${cat}:`, err.message);
                return { meals: [] };
              })
          );
          const responses = await Promise.all(promises);

          for (const [index, response] of responses.entries()) {
            const cat = apiCategories[index];
            const displayCat = categoryTranslations[cat.toLowerCase()] || cat;
            console.log(`Ответ для категории ${displayCat}:`, response);

            if (response.meals && response.meals.length > 0) {
              const validMeals = response.meals
                .filter(meal => meal && meal.strMeal && meal.strMealThumb && meal.idMeal)
                .map(meal => ({
                  idMeal: meal.idMeal,
                  title: meal.strMeal.trim(),
                  time: 'Не указано',
                  category: cat.toLowerCase(),
                  displayCategory: displayCat,
                  image: meal.strMealThumb || 'https://via.placeholder.com/150'
                }));
              allRecipes = [...allRecipes, ...validMeals.slice(0, 5)];
              if (allRecipes.length >= 30) break;
            }
          }
        }

        console.log('Полученные рецепты:', allRecipes);
        setRecipes(allRecipes);
        if (allRecipes.length === 0) {
          setError(searchQuery ? 'Блюдо не найдено. Попробуйте другой запрос.' : 'Не удалось загрузить рецепты. Попробуйте позже.');
        }
      } catch (error) {
        console.error('Ошибка загрузки рецептов:', error);
        setError('Произошла ошибка при загрузке рецептов.');
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, [searchQuery]);

  const toggleFavorite = (recipe) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some(fav => fav.id === recipe.idMeal);
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== recipe.idMeal);
    } else {
      newFavorites = [...favorites, { id: recipe.idMeal, title: recipe.title, image: recipe.image, category: recipe.displayCategory }];
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setRecipes(recipes.map(r => r.idMeal === recipe.idMeal ? { ...r, isFavorite: !isFavorite } : r));
  };

  const handleCategoryChange = (newCategory) => {
    console.log('Установка категории:', newCategory);
    setCategory(newCategory.toLowerCase());
    setSearchQuery(''); // Сбрасываем поиск при смене категории
  };

  const handleSearch = (query) => {
    console.log('Поиск:', query);
    setSearchQuery(query);
    setCategory('all'); // Сбрасываем категорию при поиске
  };

  const filteredRecipes = category === 'all'
    ? recipes
    : recipes.filter(recipe => recipe.category && recipe.category === category);

  console.log('Текущая категория:', category);
  console.log('Текущий поиск:', searchQuery);
  console.log('Текущее состояние recipes:', recipes);
  console.log('Отфильтрованные рецепты:', filteredRecipes);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-24 bg-stone-50 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center animate-fade-in">
        🍴 Рецепты
      </h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <CategoryFilter onFilterChange={handleCategoryChange} />
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-full text-center bg-white p-6 rounded-lg shadow animate-fade-in">
            <p className="text-gray-600 text-lg">🍳 Загрузка рецептов...</p>
          </div>
        ) : error ? (
          <div className="col-span-full text-center bg-white p-6 rounded-lg shadow animate-fade-in">
            <p className="text-red-600 text-lg">{error} 😔</p>
          </div>
        ) : filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => {
            const isFavorite = (JSON.parse(localStorage.getItem('favorites')) || []).some(fav => fav.id === recipe.idMeal);
            return (
              <Link to={`/recipes/${recipe.idMeal}`} key={recipe.idMeal} className="block">
                <RecipeCard
                  title={recipe.title}
                  time={recipe.time}
                  image={recipe.image}
                  category={recipe.displayCategory}
                  id={recipe.idMeal}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              </Link>
            );
          })
        ) : (
          <div className="col-span-full text-center bg-white p-6 rounded-lg shadow animate-fade-in">
            <p className="text-gray-600 text-lg">Рецепты не найдены. Попробуйте другую категорию или поиск. 😔</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeList;