import { Link } from "react-router";
const ProductTable = ({ loading, products, onDelete }) => {
  console.log(products);
  return (
    <div className="max-w-7xl mx-auto border border-slate-200 rounded-md overflow-x-auto">
      <table className="w-full">
        <thead className="text-slate-900 text-left text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
          <tr className="bg-slate-50">
            <th className="px-4 py-3.5">No</th>
            <th className="px-4 py-3.5">Nama Produk</th>
            <th className="px-4 py-3.5">Kategori</th>
            <th className="px-4 py-3.5">Harga</th>
            <th className="px-4 py-3.5">Stok</th>
            <th className="px-4 py-3.5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-slate-200">
          {loading ? (
            <tr>
              <td className="px-4 py-4 text-center" colSpan={6}>
                Loading
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td className="px-4 py-4 text-center" colSpan={6}>
                Belum ada produk.
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr className="hover:bg-slate-50" key={product.id}>
                <td className="px-4 py-4 font-medium text-slate-900">
                  {index + 1}
                </td>
                <td className="px-4 py-4 text-slate-500">
                  {product.namaproduct}
                </td>
                <td className="px-4 py-4 text-slate-500">{product.kategori}</td>
                <td className="px-4 py-4 text-slate-500">
                  Rp {Number(product.harga).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-4 text-slate-500">{product.stok}</td>
                <td className="px-4 py-4 flex gap-3 justify-center">
                  <Link
                    to={`/products/${product.id}/edit`}
                    className="btn btn-outline btn-primary"
                  >
                    Edit
                  </Link>
                  
                  <button
                    className="btn btn-outline btn-error"
                    onClick={() => onDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ProductTable;
