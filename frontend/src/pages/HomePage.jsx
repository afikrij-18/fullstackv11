import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function getData() {
      const data = await getProducts();
      setProducts(data);
    }

    getData();
  }, []);

  console.log(products);

  return (
    <div className="px-[10%]">
      <h1 className="font-bold text-2xl mt-3">Halaman Home</h1>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-3">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="hover:bg-amber-50">
              <th>No </th>
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products.map((data, index) => (
              <tr key={data.id} className="hover:bg-amber-50">
                <th>{index + 1}</th>
                <td>{data.namaproduct}</td>
                <td>{data.kategori}</td>
                <td>{data.harga}</td>
                <td>{data.stok}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
