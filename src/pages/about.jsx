import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-24 bg-stone-50 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center animate-fade-in">
        О нас 🍴
      </h1>
      <p className="text-gray-600 text-center mb-8 text-lg">
        Вдохновляем на кулинарные приключения!
      </p>

      {/* Миссия */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Наша миссия 🧑‍🍳
        </h2>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 mb-4">
            Yummy — это место, где каждый может открыть для себя радость приготовления вкусной еды. Мы стремимся сделать кулинарию доступной, вдохновляющей и увлекательной, предлагая рецепты на любой вкус — от классической паэльи до веганских десертов. Наша цель — объединить людей через любовь к еде, будь то новичок или опытный шеф-повар.
          </p>
          <img
            src="https://images.unsplash.com/photo-1556911220-bff31c812dba"
            alt="Кулинарный стол"
            className="rounded-xl w-full h-64 object-cover"
          />
        </div>
      </section>

      {/* История */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Наша история 🍽️
        </h2>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 mb-4">
            Yummy родился из страсти к еде и технологиям. В 2024 году небольшая команда энтузиастов решила создать платформу, которая объединит рецепты со всего мира, вдохновляющие истории и полезные советы. Мы начали с интеграции The Meal DB API, чтобы предложить вам тысячи рецептов, и добавили блог, чтобы делиться кулинарными секретами и историями. Сегодня Yummy — это сообщество, где каждый может найти вдохновение для следующего ужина!
          </p>
        </div>
      </section>

      {/* Команда */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Наша команда 👩‍🍳👨‍💻
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Анна, шеф-повар 🧑‍🍳
            </h3>
            <p className="text-gray-600">
              Анна тестирует рецепты и делится секретами, чтобы ваши блюда были вкусными и простыми в приготовлении.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Санжар, разработчик 💻
            </h3>
            <p className="text-gray-600">
              Санжар обеспечивает плавную работу сайта, от API до избранного, чтобы ваш опыт был безупречным.
            </p>
          </div>
          <div className="badge bg-orange-400 text-white px-4 py-2 rounded-full font-medium">И многие другие!</div>
        </div>
      </section>

      {/* Особенности */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Почему Yummy? 🥗
        </h2>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <ul className="text-gray-600 space-y-4">
            <li>
              <strong>Тысячи рецептов 🥐:</strong> Благодаря The Meal DB API вы найдете блюда на любой вкус — от завтраков до десертов.
            </li>
            <li>
              <strong>Избранное ❤️:</strong> Сохраняйте любимые рецепты и статьи в личной коллекции.
            </li>
            <li>
              <strong>Блог 📝:</strong> Полезные советы и вдохновляющие истории, чтобы готовить с удовольствием.
            </li>
            <li>
              <strong>Сообщество 🍴:</strong> Присоединяйтесь к тем, кто разделяет вашу страсть к кулинарии!
            </li>
          </ul>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Готовы начать? 🍳
        </h2>
        <Link
          to="/recipes"
          className="inline-block bg-orange-400 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-500 transition-colors animate-pulse"
          aria-label="Перейти к рецептам"
        >
          Попробовать рецепты 🥗
        </Link>
      </section>
    </div>
  );
}

export default About;