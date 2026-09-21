import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json" ,
  },
});

export async function getProducts()  {
  const res = await api.get("/product");
  return res.data;
}

export async function getProductsById(id) {
  const res = await api.get(`/product/${id}`);
  return res.data;
}

export async function createProducts(data) {
  const res = await api.post("/product", data);
  return res.data;
}

export async function updateProduct(id, data) {
  const res = await api.patch(`/product/${id}` , data);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await api.delete(`/product/${id}`);
  return res.data;
}


