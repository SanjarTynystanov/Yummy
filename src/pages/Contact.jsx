import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTelegram } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
    // Здесь будет логика отправки формы в будущем
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20 bg-stone-50 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center animate-fade-in">
        Свяжитесь с нами 📧
      </h1>
      <p className="text-gray-600 text-center mb-8 text-lg">
        Мы готовы помочь с вашими кулинарными вопросами!
      </p>

      {/* Контакты */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Наши контакты 📞
        </h2>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Телефон 📞
              </h3>
              <p className="text-gray-600">
                <a href="tel:+380501155025" className="hover:text-orange-400 transition-colors">
                  +996 501 155 025
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Email ✉️
              </h3>
              <p className="text-gray-600">
                <a href="mailto:yummy@example.com" className="hover:text-orange-400 transition-colors">
                  yummy@example.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Социальные сети 📸
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-500"
                  aria-label="Instagram"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://web.telegram.org/a/#-4825974817"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-500"
                  aria-label="Telegram"
                >
                  <FaTelegram size={24} />
                </a>
              </div>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1556911220-bff31c812dba"
            alt="Кулинарный стол"
            className="rounded-xl w-full h-64 object-cover mt-6"
          />
        </div>
      </section>

      {/* Форма обратной связи */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Напишите нам ✍️
        </h2>
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
                Email
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
              <label htmlFor="message" className="block text-gray-600 mb-1">
                Сообщение
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Ваше сообщение"
                rows="5"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-orange-400 text-white rounded-full font-medium hover:bg-orange-500 transition-colors"
              aria-label="Отправить сообщение"
            >
              Отправить ✉️
            </button>
          </form>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Хотите готовить? 🍳
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

export default Contact;