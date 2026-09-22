import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define(
  "products",
  {
    namaproduct: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nama produk tidak boleh kosong",
        },
        len: {
          args: [2, 255],
          msg: "Nama produk minimal 2 karakter",
        },
      },
    },
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "kategori tidak boleh kosong",
        },
      },
    },
    harga: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "harga tidak boleh kosong",
        },
        isFloat: {
          msg: "Harga harus berupa angka",
        },
        min: {
          args: [1],
          msg: "Harga harus lebih besar dari 0",
        },
      },
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Stok tidak boleh kosong",
        },
        isInt: {
          msg: "Stok harus berupa bilangan bulat",
        },
      },
    },
  },
  {
    freezeTableName: true,
  },
);

export default Product;

// buat function untuk membaca tabel, gunakan async
// (async() => {
//   await db.sync()
// })();
