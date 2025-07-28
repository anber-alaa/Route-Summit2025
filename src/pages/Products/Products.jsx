import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import SearchProduct from '../../components/SearchProduct/SearchProduct';
import Filter from '../../components/Filter/Filter';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('az'); // ✅

  async function getAllProduct() {
    try {
      setIsLoading(true);
      const res = await axios.get('https://fakestoreapi.com/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    document.title = 'Products';
    getAllProduct();
  }, []);

  const filteredProducts = products
    ?.filter((item) =>
      selectedCategory === 'all' ? true : item.category === selectedCategory
    )
    ?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.sort((a, b) => {
      if (sortOrder === 'az') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <SearchProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <section className="my-5 py-3 flex">
        <Filter 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <div className="container px-8 sm:px-6 md:px-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((item) => <ProductCard key={item.id} item={item} />)
            ) : (
              <p className="text-center col-span-full">No products found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
