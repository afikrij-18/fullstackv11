import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

// Pastikan fungsi ini tersedia di services kamu
import { getKaryawansById, updateKaryawans } from "../services/karyawanService";

const EditKaryawan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State form menggunakan field karyawan
  const [form, setForm] = useState({
    nomorkaryawan: "",
    namakaryawan: "",
    jeniskelamin: "",
    pendidikan: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Hapus error spesifik field saat pengguna mengetik
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
  }

  // Fetch data berdasarkan ID saat komponen di-mount
  useEffect(() => {
    async function loadKaryawan() {
      try {
        const data = await getKaryawansById(id);
        setForm(data);
      } catch (error) {
        setError("Gagal memuat data karyawan.");
      } finally {
        setLoading(false);
      }
    }

    loadKaryawan();
  }, [id]);

  function validateForm() {
    const errors = {};
    const regexTanpaSimbol = /^[-a-zA-Z0-9 ]+$/;

    // Validasi Nomor Karyawan
    if (!form.nomorkaryawan.trim()) {
      errors.nomorkaryawan = "Nomor karyawan tidak boleh kosong";
    } else if (form.nomorkaryawan.trim().length < 3) {
      errors.nomorkaryawan = "Nomor karyawan minimal 3 karakter";
    }

    // Validasi Nama Karyawan
    if (!form.namakaryawan.trim()) {
      errors.namakaryawan = "Nama karyawan tidak boleh kosong";
    } else if (form.namakaryawan.trim().length <= 2) {
      errors.namakaryawan = "Nama karyawan minimal 3 karakter";
    } else if (!regexTanpaSimbol.test(form.namakaryawan.trim())) {
      errors.namakaryawan =
        "Nama karyawan tidak boleh mengandung simbol khusus";
    }

    if (!form.jeniskelamin) {
      errors.jeniskelamin = "Jenis kelamin wajib dipilih";
    }

    if (!form.pendidikan) {
      errors.pendidikan = "Pendidikan wajib dipilih";
    }

    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    try {
      setSaving(true);
      setError("");

      // Update data menggunakan ID dari useParams
      await updateKaryawans(id, form);

      alert("Data Karyawan berhasil diperbarui");
      navigate("/karyawans"); // Sesuaikan kembali ke halaman list
    } catch (error) {
      setError("Gagal memperbarui data karyawan");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-xl font-bold mb-8 text-gray-800">
          Form Edit Karyawan
        </h1>
        <div className="w-1/2">
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 mb-5">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center gap-3">
              <span className="loading loading-spinner loading-md text-primary"></span>
              <p className="text-gray-600">Memuat data karyawan...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Input Nomor Karyawan */}
              <div className="flex flex-col gap-1 mb-3">
                <label htmlFor="nomorkaryawan" className="floating-label pb-3">
                  <input
                    type="text"
                    name="nomorkaryawan"
                    id="nomorkaryawan"
                    placeholder="Nomor Karyawan"
                    className="input input-md w-full"
                    value={form.nomorkaryawan}
                    onChange={handleChange}
                    required
                  />
                  <span>Nomor Karyawan (Misal: K001)</span>
                </label>
                {fieldErrors.nomorkaryawan && (
                  <span className="bg-red-100 text-sm text-red-700 border border-red-300 rounded p-3 mt-1">
                    {fieldErrors.nomorkaryawan}
                  </span>
                )}
              </div>

              {/* Input Nama Karyawan */}
              <div className="flex flex-col gap-1 mb-3">
                <label htmlFor="namakaryawan" className="floating-label pb-3">
                  <input
                    type="text"
                    name="namakaryawan"
                    id="namakaryawan"
                    placeholder="Nama Karyawan"
                    className="input input-md w-full"
                    value={form.namakaryawan}
                    onChange={handleChange}
                    required
                  />
                  <span>Nama Karyawan</span>
                </label>
                {fieldErrors.namakaryawan && (
                  <span className="bg-red-100 text-sm text-red-700 border border-red-300 rounded p-3 mt-1">
                    {fieldErrors.namakaryawan}
                  </span>
                )}
              </div>

              {/* Select Jenis Kelamin */}
              <div className="flex flex-col gap-1 mb-4">
                <label
                  htmlFor="jeniskelamin"
                  className="text-sm text-gray-600 mb-1 ml-1"
                >
                  Jenis Kelamin
                </label>
                <select
                  name="jeniskelamin"
                  id="jeniskelamin"
                  className="select select-bordered w-full"
                  value={form.jeniskelamin}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Pilih Jenis Kelamin
                  </option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {fieldErrors.jeniskelamin && (
                  <span className="bg-red-100 text-sm text-red-700 border border-red-300 rounded p-3 mt-1">
                    {fieldErrors.jeniskelamin}
                  </span>
                )}
              </div>

              {/* Select Pendidikan */}
              <div className="flex flex-col gap-1 mb-6">
                <label
                  htmlFor="pendidikan"
                  className="text-sm text-gray-600 mb-1 ml-1"
                >
                  Pendidikan
                </label>
                <select
                  name="pendidikan"
                  id="pendidikan"
                  className="select select-bordered w-full"
                  value={form.pendidikan}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Pilih Pendidikan
                  </option>
                  <option value="SMA">SMA</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </select>
                {fieldErrors.pendidikan && (
                  <span className="bg-red-100 text-sm text-red-700 border border-red-300 rounded p-3 mt-1">
                    {fieldErrors.pendidikan}
                  </span>
                )}
              </div>

              <div className="flex gap-x-3 justify-start">
                <Link className="btn btn-neutral btn-dash" to={"/karyawans"}>
                  Batal
                </Link>

                <button
                  type="submit"
                  className="btn btn-outline btn-primary"
                  disabled={saving}
                >
                  {saving ? "Menyimpan..." : "Update Data"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditKaryawan;
