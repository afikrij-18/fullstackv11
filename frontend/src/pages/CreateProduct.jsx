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
  const [fieldErrors, setFieldErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // hapus pesan error per field saat penggunaan mulai mengetik
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
  }

  function validateForm() {
    const errors = {};
    const regexTanpaSimbol = /^[-a-zA-Z0-9 ]+$/;

    // Validasi nama produk
    if (!form.namaproduct.trim()) {
      errors.namaproduct = "Nama produk tidak boleh kosong";
    } else if (form.namaproduct.trim().length <= 2) {
      errors.namaproduct = "Nama produk minimal 3 karakter";
    } else if (!regexTanpaSimbol.test(form.namaproduct.trim())) {
      errors.namaproduct = "Nama produk tidak boleh mengandung simbol";
    }

    // Validasi Kategori
    if (!form.kategori.trim()) {
      errors.kategori = "Nama produk tidak boleh kosong";
    } else if (form.kategori.trim().length <= 2) {
      errors.kategori = "Nama produk minimal 3 karakter";
    } else if (!regexTanpaSimbol.test(form.kategori.trim())) {
      errors.kategori = "Nama produk tidak boleh mengandung simbol";
    }

    // Validasi Harga
    if (!form.harga) {
      errors.harga = "Harga wajib diisi";
    } else if (Number(form.harga) <= 0) {
      errors.harga = "Harga harus lebih besar dari 0";
    }

    // Validasi Stok
    if (form.stok === "") {
      errors.stok = "Stok wajib diisi";
    } else if (Number(form.stok) < 0) {
      errors.stok = "Stok tidak boleh bernilai negatif";
    }

    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Jalankan validasi lokal sebelum hit API
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }
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
      <div className="max-w-6xl mx-auto p-10 ">
        <h1 className="text-xl font-bold mb-8 text-gray-800">
          Form Tambah Produk
        </h1>
        <div className="w-1/2 ">
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 mb-5">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="namaproduct" className="floating-label pb-3">
                <input
                  type="text"
                  name="namaproduct"
                  id="namaproduct"
                  placeholder="Nama Produk"
                  className="input input-md"
                  value={form.namaproduct}
                  onChange={handleChange}
                  required
                />
                <span>Nama Produk</span>
              </label>
              {fieldErrors.namaproduct && (
                <span className="bg-red-100 text-sm text-red-700 border border-red-300 rounded p-3 mb-5">
                  {fieldErrors.namaproduct}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="kategori" className="floating-label pb-3">
                <input
                  type="text"
                  name="kategori"
                  id="kategori"
                  placeholder="Kategori"
                  className="input input-md"
                  value={form.kategori}
                  onChange={handleChange}
                  required
                />
                <span>Kategori</span>
              </label>
              {fieldErrors.kategori && (
                <span className="bg-red-100 text-sm text-red-700 border border-red-300 rounded p-3 mb-5">
                  {fieldErrors.kategori}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="harga" className="floating-label pb-3">
                <input
                  type="number"
                  name="harga"
                  id="harga"
                  placeholder="Harga"
                  className="input input-md"
                  value={form.harga}
                  onChange={handleChange}
                  required
                />
                <span>Harga</span>
              </label>
              {fieldErrors.harga && (
                <span className="bg-red-100 text-sm text-red-700 border border-red-300 rounded p-3 mb-5">
                  {fieldErrors.harga}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="stok" className="floating-label pb-3">
                <input
                  type="number"
                  name="stok"
                  id="stok"
                  placeholder="Stok"
                  className="input input-md"
                  value={form.stok}
                  onChange={handleChange}
                  required
                />
                <span>Stok</span>
              </label>
              {fieldErrors.stok && (
                <span className="bg-red-100 text-sm text-red-700 border border-red-300 rounded p-3 mb-5">
                  {fieldErrors.stok}
                </span>
              )}
            </div>
            <div className="flex gap-x-1 justify-start">
              <Link className="btn btn-neutral btn-dash" to={"/"}>
                Batal
              </Link>

              <button
                className="btn btn-outline btn-primary"
                disabled={loading}
              >
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
