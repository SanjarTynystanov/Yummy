import { useParams, Link } from 'react-router-dom';

function BlogDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-20 bg-stone-50 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center animate-fade-in">
        Статья #{id} 📝
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Страница находится в разработке. Скоро здесь появится полный текст статьи! 😊
      </p>
      <Link
        to="/blog"
        className="inline-block bg-orange-400 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-500 transition-colors"
        aria-label="Вернуться к блогу"
      >
        Назад к блогу 📝
      </Link>
    </div>
  );
}

export default BlogDetail;