import express from "express";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
import KaryawanRoute from "./routes/KaryawanRoute.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json()); //agar aplikasi bisa menerima request format json
app.use(ProductRoute);
app.use(KaryawanRoute);
app.listen(3000, () => console.log('server up and Running'));
