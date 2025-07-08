import { Link } from 'react-router-dom';

function Policy() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20 bg-stone-50 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center animate-fade-in">
        Политика конфиденциальности 🔒
      </h1>
      <p className="text-gray-600 text-center mb-8 text-lg">
        Мы заботимся о вашей приватности
      </p>

      {/* Введение */}
      <section className="mb-12">
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 mb-4">
            Добро пожаловать в Yummy! Наша политика конфиденциальности объясняет, как мы собираем, используем и защищаем ваши данные, чтобы обеспечить безопасный и приятный опыт на нашем сайте. Мы стремимся быть прозрачными и уважать вашу приватность.
          </p>
        </div>
      </section>

      {/* Сбор данных */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Сбор данных 📊
        </h2>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 mb-4">
            Мы собираем минимальный объем данных, чтобы улучшить ваш опыт на сайте:
          </p>
          <ul className="text-gray-600 list-disc list-inside space-y-2">
            <li>
              <strong>Контактная информация:</strong> Если вы заполняете форму обратной связи, мы можем собирать ваше имя и email.
            </li>
            <li>
              <strong>Избранное:</strong> Рецепты и статьи, которые вы добавляете в избранное, сохраняются в вашем браузере через localStorage.
            </li>
            <li>
              <strong>Технические данные:</strong> Мы можем собирать анонимные данные о взаимодействии с сайтом (например, посещенные страницы) через аналитические инструменты для улучшения функциональности.
            </li>
          </ul>
        </div>
      </section>

      {/* Использование данных */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Использование данных 📈
        </h2>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 mb-4">
            Собранные данные используются для:
          </p>
          <ul className="text-gray-600 list-disc list-inside space-y-2">
            <li>Ответа на ваши запросы через форму обратной связи.</li>
            <li>Сохранения ваших предпочтений (избранные рецепты и статьи).</li>
            <li>Улучшения функциональности и контента сайта.</li>
            <li>Анализа анонимных данных для оптимизации пользовательского опыта.</li>
          </ul>
          <p className="text-gray-600 mt-4">
            Мы не передаем ваши данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законом.
          </p>
        </div>
      </section>

      {/* Защита данных */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Защита данных 🔐
        </h2>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 mb-4">
            Мы принимаем меры для защиты ваших данных:
          </p>
          <ul className="text-gray-600 list-disc list-inside space-y-2">
            <li>Используем шифрование для передачи данных (например, HTTPS).</li>
            <li>Ограничиваем доступ к данным только уполномоченным сотрудникам.</li>
            <li>Храним данные в localStorage только на вашем устройстве.</li>
            <li>Регулярно обновляем системы безопасности.</li>
          </ul>
        </div>
      </section>

      {/* Права пользователей */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ваши права 👤
        </h2>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 mb-4">
            Вы имеете право:
          </p>
          <ul className="text-gray-600 list-disc list-inside space-y-2">
            <li>Запрашивать доступ к вашим данным.</li>
            <li>Требовать удаление ваших данных (например, из формы обратной связи).</li>
            <li>Отказаться от сбора анонимных аналитических данных (отключите cookies в браузере).</li>
          </ul>
          <p className="text-gray-600 mt-4">
            Для запросов свяжитесь с нами по адресу{' '}
            <a
              href="mailto:yummy@example.com"
              className="text-orange-400 hover:text-orange-500"
              aria-label="Связаться по email"
            >
              yummy@example.com
            </a>.
          </p>
        </div>
      </section>

      {/* Cookies */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Cookies и localStorage 🍪
        </h2>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 mb-4">
            Мы используем localStorage для хранения ваших избранных рецептов и статей (<code>recipesFavorites</code>, <code>blogFavorites</code>). Эти данные остаются на вашем устройстве и не передаются на наши серверы. Вы можете очистить их в настройках браузера.
          </p>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Есть вопросы? 📧
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-block bg-orange-400 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-500 transition-colors animate-pulse"
            aria-label="Перейти к контактам"
          >
            Связаться с нами 📧
          </Link>
          <Link
            to="/recipes"
            className="inline-block bg-orange-400 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-500 transition-colors animate-pulse"
            aria-label="Перейти к рецептам"
          >
            Вернуться к рецептам 🥗
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Policy;