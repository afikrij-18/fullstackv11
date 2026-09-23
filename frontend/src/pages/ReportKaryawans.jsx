import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getKaryawans } from "../services/karyawanService"; // Sesuaikan path

const ReportKaryawan = () => {
    const [karyawans, setKaryawans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getKaryawans();
                setKaryawans(data);
            } catch (err) {
                setError("Gagal memuat data laporan.");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) return <div className="p-10 text-center">Loading data laporan...</div>;
    if (error) return <div className="p-10 text-red-500 text-center">{error}</div>;

    // --- PERHITUNGAN RINGKASAN BERDASARKAN HASIL GET API ---
    // Ringkasan 1: Total Karyawan
    const totalKaryawan = karyawans.length;

    // Ringkasan 2: Berdasarkan Jenis Kelamin
    const totalLakiLaki = karyawans.filter(k => k.jeniskelamin && k.jeniskelamin.toLowerCase().trim() === "laki-laki").length;
    const totalPerempuan = karyawans.filter(k => k.jeniskelamin && k.jeniskelamin.toLowerCase().trim() === "perempuan").length;

    // Ringkasan 3: Berdasarkan Pendidikan (Fungsi pembantu)
    const countPendidikan = (jenjang) => karyawans.filter(k => k.pendidikan === jenjang).length;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto p-10">
                <div className="mb-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Laporan Data Karyawan</h1>
                    <Link to="/karyawans" className="btn btn-outline">Kembali ke Daftar</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Ringkasan 1 */}
                    <div className="bg-white p-6 rounded-md shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-700 border-b pb-2 mb-4">Ringkasan 1 - Total Karyawan</h2>
                        <p className="text-3xl font-bold text-blue-600">Total Karyawan : {totalKaryawan}</p>
                    </div>

                    {/* Ringkasan 2 */}
                    <div className="bg-white p-6 rounded-md shadow-sm border border-slate-200">
                        <h2 className="text-lg font-bold text-slate-700 border-b pb-2 mb-4">Ringkasan 2 - Jenis Kelamin</h2>
                        <ul className="text-lg space-y-2 text-slate-600 font-medium">
                            <li className="flex justify-between"><span>Laki-laki</span> <span>: {totalLakiLaki}</span></li>
                            <li className="flex justify-between"><span>Perempuan</span> <span>: {totalPerempuan}</span></li>
                        </ul>
                    </div>

                    {/* Ringkasan 3 */}
                    <div className="bg-white p-6 rounded-md shadow-sm border border-slate-200 md:col-span-2">
                        <h2 className="text-lg font-bold text-slate-700 border-b pb-2 mb-4">Ringkasan 3 - Berdasarkan Pendidikan</h2>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600">
                                    <th className="border-b p-3">Pendidikan</th>
                                    <th className="border-b p-3">Jumlah Karyawan</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600 font-medium">
                                <tr><td className="border-b p-3">SMA</td><td className="border-b p-3">{countPendidikan("SMA")}</td></tr>
                                <tr><td className="border-b p-3">D3</td><td className="border-b p-3">{countPendidikan("D3")}</td></tr>
                                <tr><td className="border-b p-3">S1</td><td className="border-b p-3">{countPendidikan("S1")}</td></tr>
                                <tr><td className="border-b p-3">S2</td><td className="border-b p-3">{countPendidikan("S2")}</td></tr>
                                <tr><td className="border-b p-3">S3</td><td className="border-b p-3">{countPendidikan("S3")}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportKaryawan;