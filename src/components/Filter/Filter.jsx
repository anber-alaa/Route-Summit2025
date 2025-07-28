export default function Filter({ selectedCategory, setSelectedCategory, sortOrder, setSortOrder }) {
  const categories = ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"];

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-4 w-full max-w-[220px]">
      <h3 className="text-md font-semibold mb-3 text-gray-700">Filter by Category</h3>
      <ul className="space-y-2 mb-5">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-all duration-150 ${
                selectedCategory === cat
                  ? 'bg-primaryColor text-white font-bold'
                  : 'bg-gray-100 hover:bg-mainColor/10 text-gray-700'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      <h3 className="text-md font-semibold mb-3 text-gray-700">Sort by Title</h3>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-700"
      >
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
      </select>
    </div>
  );
}
