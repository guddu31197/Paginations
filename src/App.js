import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { PAGE_SIZE } from "./constants";
import "./styles.css";
import Paginations, { Pagination } from "./components/Paginations";

export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    setProducts(json.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };
  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return !products.length ? (
    <h1>No Products Found</h1>
  ) : (
    <div className="App">
      <h1>Paginations</h1>
      <Paginations
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        handlePageChange={handlePageChange}
        noOfPages={noOfPages}
        currentPage={currentPage}
      />

      <div className="products-container">
        {products.slice(start, end).map((p) => (
          <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
        ))}
      </div>
    </div>
  );
}
