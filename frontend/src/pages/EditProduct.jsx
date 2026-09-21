import { Link, useNavigate, useParams } from "react-router";
import { getProductsById, updateProduct } from "../services/productService";
import { useEffect, useState } from "react";

const EditProduct = () => {
  const [product, setProduct] = useState({
    namaproduct: "",
    kategori: "",
    harga: "",
    stok: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductsById(id);
        setProduct(data);
      } catch (error) {
        setError("Gagal memuat data produk.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      await updateProduct(id, {
        ...product,
        harga: Number(product.harga),
        stok: Number(product.stok),
      });
      navigate("/");
    } catch (error) {
      setError("Gagal memperbarui produk");
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-xl font-bold mb-8 text-gray-800">
          Form Edit Produk
        </h1>
        <div className="w-1/2">
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 mb-5">
              {error}
            </div>
          )}
          {loading ? (
            <p className="text-gray-600">Memuat data produk...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 mb-3">
                <label htmlFor="namaproduct" className="floating-label pb-3">
                  <input
                    type="text"
                    name="namaproduct"
                    id="namaproduct"
                    placeholder="Nama Produk"
                    className="input input-md"
                    value={product.namaproduct}
                    onChange={handleChange}
                    required
                  />
                  <span>Nama Produk</span>
                </label>
              </div>
              <div className="flex flex-col gap-1 mb-3">
                <label htmlFor="kategori" className="floating-label pb-3">
                  <input
                    type="text"
                    name="kategori"
                    id="kategori"
                    placeholder="Kategori"
                    className="input input-md"
                    value={product.kategori}
                    onChange={handleChange}
                    required
                  />
                  <span>Kategori</span>
                </label>
              </div>
              <div className="flex flex-col gap-1 mb-3">
                <label htmlFor="harga" className="floating-label pb-3">
                  <input
                    type="number"
                    name="harga"
                    id="harga"
                    placeholder="Harga"
                    className="input input-md"
                    value={product.harga}
                    onChange={handleChange}
                    required
                  />
                  <span>Harga</span>
                </label>
              </div>
              <div className="flex flex-col gap-1 mb-3">
                <label htmlFor="stok" className="floating-label pb-3">
                  <input
                    type="number"
                    name="stok"
                    id="stok"
                    placeholder="Stok"
                    className="input input-md"
                    value={product.stok}
                    onChange={handleChange}
                    required
                  />
                  <span>Stok</span>
                </label>
              </div>
              <div className="flex gap-x-1 justify-start">
                <Link to={"/"} className="btn btn-neutral btn-dash">
                  Batal
                </Link>
                <button className="btn btn-outline btn-primary">
                  {saving ? "Menyimpan..." : "Update"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
