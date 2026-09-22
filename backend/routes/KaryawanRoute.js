import express from "express";
import { createKaryawan, deleteKaryawan, getKaryawans, getKaryawansById, getKaryawansByJabatan, updateGajiKaryawan, updateKaryawan } from "../controllers/KaryawanControllers.js";

const router = express.Router();


// jika ada 2 atau lebih url menggunakan method yang sama, maka function yang paling atas yang akan digunakan, solusinya bedakan url di route nya
router.get('/karyawans', getKaryawans);
router.get('/karyawans/:id', getKaryawansById);
router.post('/karyawans', createKaryawan);
router.patch('/karyawans/:id', updateKaryawan);
router.delete('/karyawans/:id', deleteKaryawan);
export default router;



