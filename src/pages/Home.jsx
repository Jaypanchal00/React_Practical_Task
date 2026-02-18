import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories, fetchProductsByCategory } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const dispatch = useDispatch();
  const { items, total, categories } = useSelector((state) => state.products);

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const limit = 10;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    } else {
      dispatch(fetchProducts({ limit, skip: (page - 1) * limit }));
    }
  }, [dispatch, page, category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  return (
    <div className="container">
      <div className="filter-section">
        <h2>Products</h2>
        <select onChange={handleCategoryChange} value={category}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
             <option key={cat.slug || cat} value={cat.slug || cat}>
               {cat.name || cat}
             </option>
          ))}
        </select>
      </div>

      <div className="grid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!category && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
         
          <span> Page {page} </span>
          <button disabled={page * limit >= total} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}
