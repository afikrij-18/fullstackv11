import { Link } from "react-router";
const KaryawanTable = ({ loading, karyawans, onDelete }) => {
  console.log(karyawans);
  return (
    <div className="max-w-7xl mx-auto border border-slate-200 rounded-md overflow-x-auto">
      <table className="w-full">
        <thead className="text-slate-900 text-left text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
          <tr className="bg-slate-50">
            <th className="px-4 py-3.5">No</th>
            <th className="px-4 py-3.5">Nomor Karyawan</th>
            <th className="px-4 py-3.5">Nama Karyawan</th>
            <th className="px-4 py-3.5">Jenis Kelamin</th>
            <th className="px-4 py-3.5">Pendidikan</th>
            <th className="px-4 py-3.5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-slate-200">
          {loading ? (
            <tr>
              <td className="px-4 py-4 text-center" colSpan={6}>
                <span className="loading loading-spinner loading-md align-middle"></span>
                <p>Memuat data ...</p>
              </td>
            </tr>
          ) : karyawans.length === 0 ? (
            <tr>
              <td className="px-4 py-4 text-center" colSpan={6}>
                Belum ada.
              </td>
            </tr>
          ) : (
            karyawans.map((karyawan, index) => (
              <tr className="hover:bg-slate-50" key={karyawan.id}>
                <td className="px-4 py-4 font-medium text-slate-900">
                  {index + 1}
                </td>
                <td className="px-4 py-4 text-slate-500">
                  {karyawan.nomorkaryawan}
                </td>
                <td className="px-4 py-4 text-slate-500">
                  {karyawan.namakaryawan}
                </td>
                <td className="px-4 py-4 text-slate-500">
                  {karyawan.jeniskelamin}
                </td>
                <td className="px-4 py-4 text-slate-500">
                  {karyawan.pendidikan}
                </td>
                <td className="px-4 py-4 flex gap-3 justify-center">
                  <Link
                    to={`/karyawans/${karyawan.id}/edit`}
                    className="btn btn-outline btn-primary"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-outline btn-error"
                    onClick={() => onDelete(karyawan.id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/karyawans/${karyawan.id}`}
                    className="btn btn-outline btn-info"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default KaryawanTable;
