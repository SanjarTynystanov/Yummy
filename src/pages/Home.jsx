import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { categoryTranslations, areaTranslations } from '../translations';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const cached = localStorage.getItem('cachedRecipes');
        if (cached) {
          const { recipes, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < 3600000) {
            setRecipes(recipes);
            setLoading(false);
            return;
          }
        }

        const promises = Array.from({ length: 24 }, () =>
          fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(res => {
              if (!res.ok) throw new Error(`Ошибка HTTP! Статус: ${res.status}`);
              return res.json();
            })
        );
        const responses = await Promise.all(promises);
        const fetchedRecipes = responses
          .map(response => response.meals?.[0])
          .filter(meal => meal && meal.idMeal && meal.strMeal && meal.strMealThumb)
          .map(meal => ({
            id: meal.idMeal,
            title: meal.strMeal,
            image: meal.strMealThumb,
            readyInMinutes: 'Не указано',
            category: categoryTranslations[meal.strCategory?.toLowerCase()] || meal.strCategory || 'Не указано',
            area: areaTranslations[meal.strArea?.toLowerCase()] || meal.strArea || 'Не указано'
          }));

        console.log('Ответ API The Meal DB:', fetchedRecipes);
        if (fetchedRecipes.length === 0) {
          throw new Error('Не удалось загрузить рецепты.');
        }

        setRecipes(fetchedRecipes);
        localStorage.setItem('cachedRecipes', JSON.stringify({
          recipes: fetchedRecipes,
          timestamp: Date.now()
        }));
      } catch (error) {
        console.error('Ошибка при получении рецептов:', error);
        setError('Не удалось загрузить рецепты. Попробуйте позже или выберите другую категорию.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const toggleFavorite = (recipe) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some(fav => fav.id === recipe.id);
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== recipe.id);
    } else {
      newFavorites = [...favorites, recipe];
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setRecipes(recipes.map(r => r.id === recipe.id ? { ...r, isFavorite: !isFavorite } : r));
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const testimonials = [
    { name: 'Анна К.', rating: 5, quote: 'Yummy — это любовь с первого рецепта! Легко найти блюда на любой вкус.' },
    { name: 'Михаил П.', rating: 4, quote: 'Отличный сайт, рецепты простые и вкусные, но хотелось бы больше веганских блюд.' },
    { name: 'Екатерина С.', rating: 5, quote: 'Интерфейс удобный, а рецепты всегда получаются! Мой фаворит — десерты.' },
    { name: 'Дмитрий Л.', rating: 5, quote: 'Быстро, красиво, вкусно. Теперь готовлю ужин за полчаса!' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-16">
      {/* Секция Hero */}
      <section className="bg-stone-50 rounded-2xl p-8 mb-8 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
          🍳 Добро пожаловать в Yummy!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Откройте мир вкусных рецептов для любого случая — от завтраков до изысканных ужинов.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/recipes"
            className="inline-block bg-orange-400 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-500 transition"
          >
            Посмотреть все рецепты
          </Link>
        </div>
      </section>

      {/* Секция "Почему Yummy?" */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Почему Yummy?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition animate-fade-in">
            <h3 className="text-xl font-semibold text-orange-600 mb-2">Отборные рецепты</h3>
            <p className="text-gray-600">Только проверенные рецепты от лучших кулинаров.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition animate-fade-in">
            <h3 className="text-xl font-semibold text-orange-600 mb-2">Удобная навигация</h3>
            <p className="text-gray-600">Фильтры по категориям помогут быстро найти нужное блюдо.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition animate-fade-in">
            <h3 className="text-xl font-semibold text-orange-600 mb-2">Для всех</h3>
            <p className="text-gray-600">Рецепты для веганов, мясоедов и любителей десертов!</p>
          </div>
        </div>
      </section>

      {/* Секция рецептов с каруселью */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Популярные рецепты</h2>
        {loading ? (
          <p className="text-center text-gray-500">🍳 Загрузка рецептов...</p>
        ) : error ? (
          <div className="text-center text-red-600">
            <p>{error}</p>
            <Link
              to="/recipes"
              className="inline-block mt-4 bg-orange-400 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-500 transition"
            >
              Посмотреть другие рецепты
            </Link>
          </div>
        ) : recipes.length > 0 ? (
          <div className="relative">
            <button
              onClick={scrollLeft}
              aria-label="Прокрутить рецепты влево"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-400 text-white p-2 rounded-full hover:bg-orange-500 transition z-10"
            >
            </button>
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scroll-smooth gap-6 pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {recipes.map((recipe) => {
                const isFavorite = (JSON.parse(localStorage.getItem('favorites')) || []).some(fav => fav.id === recipe.id);
                return (
                  <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                    <div
                      className="flex-none bg-white rounded-2xl shadow p-4 hover:shadow-lg transition transform hover:-translate-y-1 w-64"
                    >
                      <img
                        src={recipe.image || 'https://via.placeholder.com/150'}
                        alt={recipe.title || 'Изображение рецепта'}
                        className="rounded-xl w-full h-48 object-cover mb-4"
                      />
                      <h2 className="text-xl font-semibold mb-2 truncate">{recipe.title || 'Без названия'}</h2>
                      <p className="text-gray-600">⏱ {recipe.readyInMinutes}</p>
                      <p className="text-gray-600">🥗 {recipe.category}</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(recipe);
                        }}
                        className={`mt-2 px-4 py-2 rounded-full font-medium transition ${
                          isFavorite ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-600'
                        } hover:bg-orange-500 hover:text-white`}
                        aria-label={isFavorite ? `Удалить ${recipe.title} из избранного` : `Добавить ${recipe.title} в избранное`}
                      >
                        {isFavorite ? '❤️ В избранном' : '🖤 Добавить в избранное'}
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
            <button
              onClick={scrollRight}
              aria-label="Прокрутить рецепты вправо"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-400 text-white p-2 rounded-full hover:bg-orange-500 transition z-10"
            >
            </button>
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p>Рецепты не найдены. 😔</p>
            <Link
              to="/recipes"
              className="inline-block mt-4 bg-orange-400 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-500 transition"
            >
              Посмотреть другие рецепты
            </Link>
          </div>
        )}
      </section>

      {/* Секция отзывов */}
      <section className="bg-stone-50 rounded-2xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Что говорят наши пользователи</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-2">"{testimonial.quote}"</p>
              <p className="text-gray-800 font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Футер */}
      <footer className="text-center text-gray-600 py-7 px-4 bg-stone-50 rounded-2xl">
        <p>© 2025 Yummy. Все права защищены.</p>
        <div className="flex justify-center gap-8 mt-4 ">
          <Link to="/about" className="hover:text-orange-400">О нас</Link>
          <Link to="/contact" className="hover:text-orange-400">Контакты</Link>
          <Link to="/policy" className="hover:text-orange-400">Политика конфиденциальности</Link>
          <Link to="/favorites" className="hover:text-orange-400">Избранное</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;