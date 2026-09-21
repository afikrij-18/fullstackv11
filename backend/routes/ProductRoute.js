// pada aplikasi ini menggunakan express routers
import express from "express";
import { createProduct, deleteProduct, getProducts,getProductsByCategory,getProductsById, searchProducts, updateProduct, updateStokProducts } from "../controllers/ProductControllers.js";

const router = express.Router();

router.get('/product', getProducts);
router.get('/product/search', searchProducts);
router.get('/product/:id', getProductsById);
router.get('/product/kategori/:kategori', getProductsByCategory);
router.post('/product', createProduct);
router.patch('/product/:id', updateProduct);
router.patch('/product/:id/stok', updateStokProducts)
router.delete('/product/:id', deleteProduct);

export default router;