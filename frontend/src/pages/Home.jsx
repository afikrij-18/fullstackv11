import ProductTable from "../components/ProductTable";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../services/productService";
import { Link } from "react-router";
import EditProduct from "./EditProduct";
import CreateProduct from "./CreateProduct";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError("Gagal memuat data produk.");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);
  async function handleDelete(id) {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      setError("");
      await deleteProduct(id);
      const remainingProducts = products.filter((product) => product.id !== id);
      setProducts(remainingProducts);
    } catch (error) {
      setError("Gagal menghapus produk.");
    }
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-10">
        <div className="mb-3">
          <h1 className="text-xl font-bold mb-8 text-gray-800">
            Daftar Produk
          </h1>
          <Link
            to={"/products/create"}
            className="btn btn-outline btn-primary"
          >
            Tambah Produk
          </Link>          
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 mb-5">
            {error}
          </div>
        )}
        <ProductTable
          loading={loading}
          products={products}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
export default Home;
