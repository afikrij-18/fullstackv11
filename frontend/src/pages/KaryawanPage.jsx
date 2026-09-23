import { useEffect, useState } from "react";
import { deleteKaryawan, getKaryawans } from "../services/karyawanService";
import KaryawanTable from "../components/KaryawanTable";
import { Link } from "react-router";

const KaryawanPage = () => {
  const [karyawans, setKaryawans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State baru untuk menyimpan pilihan filter pendidikan
  const [filterPendidikan, setFilterPendidikan] = useState("Semua");
  const [filterJenisKelamin, setFilterJenisKelamin] = useState("Semua");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    async function loadKaryawans() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await getKaryawans();
        setKaryawans(data);
      } catch (error) {
        setError("Gagal memuat data karyawan.");
      } finally {
        setLoading(false);
      }
    }
    loadKaryawans();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;
    try {
      setError("");
      await deleteKaryawan(id);
      const remainingKaryawans = karyawans.filter((k) => k.id !== id);
      setKaryawans(remainingKaryawans);
    } catch (error) {
      setError("Gagal menghapus data karyawan.");
    }
  }

  // --- LOGIKA SOAL 2: Menghitung Ringkasan Data berdasarkan hasil API ---
  const totalKaryawan = karyawans.length;
  const totalLakiLaki = karyawans.filter(
    (k) => k.jeniskelamin.trim().toLowerCase() === "laki-laki",
  ).length;
  const totalPerempuan = karyawans.filter(
    (k) => k.jeniskelamin.trim().toLowerCase() === "perempuan",
  ).length;

  // --- LOGIKA SOAL 2: Filter Data ---
  // Jika filter diset "Semua", kembalikan data utuh, sebaliknya saring data sesuai pilihan pendidikan
  const filteredKaryawans = karyawans.filter((k) => {
    const cocokPendidikan =
      filterPendidikan === "Semua" || k.pendidikan === filterPendidikan;
    const cocokJenisKelamin =
      filterJenisKelamin === "Semua" ||
      (k.jeniskelamin &&
        k.jeniskelamin.toLowerCase().trim() ===
          filterJenisKelamin.toLowerCase());

    const cocokNama =
      k.namakaryawan &&
      k.namakaryawan.toLowerCase().includes(searchName.toLowerCase());

    return cocokPendidikan && cocokJenisKelamin && cocokNama;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-10">
        <div className="mb-3">
          <h1 className="text-2xl font-bold mb-8 text-gray-800">
            Laporan Data Karyawan
          </h1>
          <Link
            to={"/karyawans/create"}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-700"
          >
            Tambah Karyawan
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded p-3 mb-5">
            {error}
          </div>
        )}

        {/* --- TAMPILAN SOAL 2: RINGKASAN DATA --- */}
        <div className="bg-white p-5 rounded-md shadow-sm mb-6 flex gap-12 border border-slate-200">
          <div>
            <h2 className="text-slate-500 font-semibold text-sm uppercase">
              Total Karyawan
            </h2>
            <p className="text-3xl font-bold text-slate-800">{totalKaryawan}</p>
          </div>
          <div>
            <h2 className="text-slate-500 font-semibold text-sm uppercase">
              Laki-laki
            </h2>
            <p className="text-3xl font-bold text-blue-600">{totalLakiLaki}</p>
          </div>
          <div>
            <h2 className="text-slate-500 font-semibold text-sm uppercase">
              Perempuan
            </h2>
            <p className="text-3xl font-bold text-pink-600">{totalPerempuan}</p>
          </div>
        </div>

        {/* --- TAMPILAN SOAL 2: FILTER PENDIDIKAN --- */}
        <div className="mb-5 flex items-center gap-3">
          <div>
            <input
              type="text"
              placeholder="Cari nama karyawan ..."
              className="input input-md w-full"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <label className="font-semibold text-slate-700 text-sm">
            Pendidikan :
          </label>
          {/* Menggunakan style class select bawaan Daisy UI jika terpasang */}
          <select
            className="select select-bordered select-sm w-full max-w-xs"
            value={filterPendidikan}
            onChange={(e) => setFilterPendidikan(e.target.value)}
          >
            <option value="Semua">Semua</option>
            <option value="SMA">SMA</option>
            <option value="D3">D3</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
            <option value="S3">S3</option>
          </select>

          <div className="flex item-center gap-3">
            <label className="font-semibold text-slate-700 text-sm">
              Jenis Kelamin
            </label>
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              value={filterJenisKelamin}
              onChange={(e) => setFilterJenisKelamin(e.target.value)}
            >
              <option value="Semua">Semua</option>
              <option value="Laki-laki">laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
        </div>

        {/* KaryawanTable menerima data 'filteredKaryawans' yang sudah tersaring oleh filter pendidikan */}
        <KaryawanTable
          loading={loading}
          karyawans={filteredKaryawans}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
export default KaryawanPage;
