import { useEffect, useState } from "react";
import { fetchProducts } from "./api";
import { Products } from "./types";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0); // Track total products
  const productPerPage = 4;

  useEffect(() => {
    const loadProducts = async () => {
      // console.log(`Loading products for page: ${currentPage} with limit: ${productPerPage}`);  // Debugging line
      try {
        const { products: fetchedProducts, total } = await fetchProducts(currentPage, productPerPage);
        setProducts(fetchedProducts);
        setTotalProducts(total);
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [currentPage]);
  
  const totalPages = Math.ceil(totalProducts / productPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <p>loading ...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <>
      <div>
        <h1 className="text-3xl mb-2">Product List</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-400 p-5 rounded-lg">
        {products.map((product) => (
          <div key={product.id}>
            <img
              className="max-h-36 mx-auto my-3 bg-white rounded-xl"
              src={product.images[0]}
              alt={product.title}
            />
            <h2 className="text-xl">{product.title}</h2>
            <p className="text-blue-800">${product.price}</p>
            <Link
              to={`/products/${product.id}`}
              className="hover:underline hover:text-lg hover:text-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => handlePageChange(index + 1)}
      className={`px-4 py-2 mx-1 border rounded-md ${
        currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
      }`}
    >
      {index + 1}
    </button>
  ))}
</div>

    </>
  );
}

export default ProductList;
