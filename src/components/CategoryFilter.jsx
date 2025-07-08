import { useState } from 'react';
import { categoryTranslations } from '../translations';

const CategoryFilter = ({ onFilterChange }) => {
  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'beef', label: categoryTranslations['beef'] },
    { value: 'chicken', label: categoryTranslations['chicken'] },
    { value: 'dessert', label: categoryTranslations['dessert'] },
    { value: 'lamb', label: categoryTranslations['lamb'] },
    { value: 'seafood', label: categoryTranslations['seafood'] },
    { value: 'pasta', label: categoryTranslations['pasta'] },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    onFilterChange(newCategory);
  };

  return (
    <div className="mb-6">
      <label htmlFor="category-filter" className="block text-lg font-semibold text-gray-800 mb-2">
        Выберите категорию:
      </label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={handleChange}
        className="w-full md:w-64 p-2 border rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;