import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
// Gunakan fungsi getKaryawanById yang sudah kamu miliki
import { getKaryawansById } from "../services/karyawanService"; 

const DetailKaryawan = () => {
    // Tangkap parameter 'id' dari URL
    const { id } = useParams(); 
    const [karyawan, setKaryawan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchDetail() {
            try {
                // Gunakan id untuk mengambil data API
                const data = await getKaryawansById(id);
                setKaryawan(data);
            } catch (err) {
                setError("Gagal memuat detail karyawan.");
            } finally {
                setLoading(false);
            }
        }
        fetchDetail();
    }, [id]); // Masukkan id ke dalam dependency array

    if (loading) return <div className="p-10 text-center">Loading detail...</div>;
    if (error) return <div className="p-10 text-red-500 text-center">{error}</div>;
    if (!karyawan) return <div className="p-10 text-center">Data Karyawan tidak ditemukan.</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full border border-slate-200">
                <h1 className="text-2xl font-bold text-center mb-6 border-b pb-4 text-slate-800">Profil Detail Karyawan</h1>
                
                <div className="space-y-4 mb-8">
                    <div>
                        <p className="text-sm text-gray-500">Nomor Karyawan</p>
                        <p className="text-lg font-semibold text-slate-800">{karyawan.nomorkaryawan}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Nama Lengkap</p>
                        <p className="text-lg font-semibold text-slate-800">{karyawan.namakaryawan}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Jenis Kelamin</p>
                        <p className="text-lg font-semibold text-slate-800">{karyawan.jeniskelamin}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Pendidikan</p>
                        <p className="text-lg font-semibold text-slate-800">{karyawan.pendidikan}</p>
                    </div>
                </div>

                <Link to="/karyawans" className="btn btn-primary w-full">Kembali ke Daftar</Link>
            </div>
        </div>
    );
};

export default DetailKaryawan;    