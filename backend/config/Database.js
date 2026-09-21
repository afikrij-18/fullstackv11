import { Sequelize } from "sequelize";

export const db = new Sequelize('penjualan', 'root', '', {
  host:'localhost',
  dialect:'mysql'
});

