import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { createProducts } from "../services/productService";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    namaproduct: "",
    kategori: "",
    harga: "",
    stok: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createProducts({
        ...form,
        harga: Number(form.harga),
        stok: Number(form.stok),
      });

      alert("Produk berhasil ditambahkan");
      navigate("/");
    } catch (error) {
      setError("Terjadi kesalahan saat menambah produk");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-xl font-bold mb-8 text-gray-800">
          Form Tambah Produk
        </h1>
        <div className="w-1/2">
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 mb-5">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="namaproduct" className="text-gray-800">
                Nama Produk
              </label>
              <input
                type="text"
                name="namaproduct"
                id="namaproduct"
                className="border border-gray-500 px-4 py-2 text-sm rounded outline-none"
                value={form.namaproduct}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="kategori" className="text-gray-800">
                Kategori
              </label>
              <input
                type="text"
                name="kategori"
                id="kategori"
                className="border border-gray-500 px-4 py-2 text-sm rounded outline-none"
                value={form.kategori}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="harga" className="text-gray-800">
                Harga
              </label>
              <input
                type="number"
                name="harga"
                id="harga"
                className="border border-gray-500 px-4 py-2 text-sm rounded outline-none"
                value={form.harga}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="stok" className="text-gray-800">
                Stok
              </label>
              <input
                type="number"
                name="stok"
                id="stok"
                className="border border-gray-500 px-4 py-2 text-sm rounded outline-none"
                value={form.stok}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex gap-x-1 justify-end">
              <Link className="btn btn-active" to={"/"}>
                Batal
              </Link>

              <button className="btn btn-active btn-primary" disabled={loading}>
                {loading ? "Menyimpan..." : "Tambah"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
