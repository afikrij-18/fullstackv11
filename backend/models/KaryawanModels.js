import { Sequelize } from "sequelize";
import { db } from "../config/Database.js";

const { DataTypes } = Sequelize;

const Karyawans = db.define('karyawans', {
  idKar: DataTypes.STRING,
  nama: DataTypes.STRING,
  jeniskelamin: DataTypes.STRING,
  jabatan: DataTypes.STRING,
  pendidikan: DataTypes.STRING,
  gaji:DataTypes.FLOAT
}, {
  freezeTableName: true
});

export default Karyawans;

// buat function untuk membaca tabel, gunakan async
// (async() => {
//   await db.sync({alter: true})
// })();