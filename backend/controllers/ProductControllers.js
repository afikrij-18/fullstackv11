import { Op } from "sequelize";
import Product from "../models/ProductModels.js";

// menampilkan seluruh data product
export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// menampilkan data produk berdasarkan id
export const getProductsById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createProduct = async (req, res) => {
  try {
    const { namaproduct, kategori, harga, stok } = req.body;
    if (
      !namaproduct ||
      typeof namaproduct !== "string" ||
      !kategori ||
      typeof kategori !== "string"
    ) {
      return res
        .status(400)
        .json({ msg: "Nama produk dan kategori wajib diisi berupa teks" });
    }

    const cleanNamaproduct = namaproduct.trim();
    const cleanKategori = kategori.trim();
    const regexTanpaSimbol = /^[a-zA-Z0-9 ]+$/;

    if (!regexTanpaSimbol.test(cleanNamaproduct)) {
      return res
        .status(400)
        .json({
          msg: "Nama produk tidak boleh mengandung simbol/karakter khusus",
        });
    }
    if (!regexTanpaSimbol.test(cleanKategori)) {
      return res
        .status(400)
        .json({
          msg: "Kategori tidak boleh mengandung simbol/karakter khusus",
        });
    }

    if (
      cleanNamaproduct.length <= 2 ||
      cleanNamaproduct.length > 255 ||
      cleanKategori.length > 255
    ) {
      return res
        .status(400)
        .json({ msg: "Nama produk minimal 3 huruf atau kategori invalid" });
    }

    if (typeof harga !== "number" || Number.isNaN(harga) || typeof stok!== "number" || Number.isNaN(stok) || harga < 0) {
      return res.status(400).json({ msg: "harga harus > 0 dan stok tidak boleh negatif"})
    }

    const response = await Product.create(req.body);

    res.status(201).json({ msg: "Created Product" });
  } catch (error) {
    console.log(error.message);
  }
};

// mengedit product berdasarkan id
export const updateProduct = async (req, res) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product updated" });
  } catch (error) {
    console.log(error.message);
  }
};

// delete product berdasarkan id
export const deleteProduct = async (req, res) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

//get product berdasarkan kategori
export const getProductsByCategory = async (req, res) => {
  try {
    const response = await Product.findAll({
      where: {
        kategori: req.params.kategori,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

//mencari nama product dan maksimum harga
export const searchProducts = async (req, res) => {
  try {
    const query = req.query;
    const response = await Product.findAll({
      where: {
        namaproduct: query.nama,
        harga: {
          [Op.lte]: query.maxHarga,
        },
      },
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStokProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const { stock } = req.body;
    let baru = 0;
    const data = await Product.findOne({
      where: {
        id,
      },
    });

    // if (stock === undefined || stock === "" || isNaN(stock))return res.status(500).json({ msg: "stock tidak boleh kosong" });

    if (!data) return res.status(404).json({ msg: "Produk tidak ditemukan" });

    baru = data.stok + stock;

    // console.log("data baru:  ",baru);
    await Product.update(
      { stok: baru },
      {
        where: {
          id,
        },
      },
    );

    res.status(201).json({
      msg: "Stock berhasil ditambahkan",
      data: {
        stock_lama: data.stok,
        stock_baru: stock,
        jumlah_stock: baru,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};
