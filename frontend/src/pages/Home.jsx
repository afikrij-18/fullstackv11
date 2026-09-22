import ProductTable from "../components/ProductTable";
import { useEffect, useMemo, useState } from "react";
import { deleteProduct, getProducts } from "../services/productService";
import { Link } from "react-router";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // State untuk pencarian teks & filter kategori
  const [search, setSearch] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");

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

  // 1. Ekstrak daftar kategori unik secara otomatis dari data produk
  const categories = useMemo(() => {
    if (!Array.isArray(products)) return [];
    // Mengambil nilai kategori dan menghilangkan duplikat
    const uniqueCategories = [...new Set(products.map((p) => p.kategori).filter(Boolean))];
    return uniqueCategories;
  }, [products]);

  // 2. Combined Filter (Teks & Kategori)
  const filtered = useMemo(() => {
    if (!Array.isArray(products)) return [];

    const keyword = search.toLowerCase().trim();

    return products.filter((product) => {
      // Pengecekan teks nama produk
      const matchSearch = !keyword || product.namaproduct?.toLowerCase().includes(keyword);

      // Pengecekan dropdown kategori
      const matchKategori = !selectedKategori || product.kategori === selectedKategori;

      // Harus memenuhi kedua kondisi
      return matchSearch && matchKategori;
    });
  }, [products, search, selectedKategori]);

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-10">
        <div className="mb-3">
          <h1 className="text-xl font-bold mb-8 text-gray-800">
            Daftar Produk
          </h1>
          <Link to={"/products/create"} className="btn btn-outline btn-primary">
            Tambah Produk
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 mb-5">
            {error}
          </div>
        )}

        {/* SECTION FILTER & SEARCH */}
        <div className="flex flex-col md:flex-row justify-between mb-6 items-center">
          {/* Input Search Nama Produk */}
          <div className="w-full md:w-1/2">
            <label htmlFor="search" className="floating-label">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Cari Produk"
                className="input input-md w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span>Cari Produk</span>
            </label>
          </div>

          {/* Select Dropdown Filter Kategori */}
          <div className="w-full md:w-1/3">
            <select
              className="select w-full"
              value={selectedKategori}
              onChange={(e) => setSelectedKategori(e.target.value)}
            >
              {/* Option untuk menampilkan semua kategori */}
              <option value="">Semua Kategori</option>
              
              {/* Opsi dinamis dari database */}
              {categories.map((kat, index) => (
                <option key={index} value={kat}>
                  {kat}
                </option>
              ))}
            </select>
          </div>

         
        </div>

        {/* Tabel Produk */}
        <ProductTable
          loading={loading}
          products={filtered}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Home;