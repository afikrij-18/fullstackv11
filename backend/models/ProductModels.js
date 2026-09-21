import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define('products', {
  namaproduct: DataTypes.STRING,
  kategori: DataTypes.STRING,
  harga: DataTypes.FLOAT,
  stok: DataTypes.INTEGER
}, {
  freezeTableName: true
});

export default Product;

// buat function untuk membaca tabel, gunakan async
// (async() => {
//   await db.sync()
// })();