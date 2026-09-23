import axios from "axios";

const api = axios.create ({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    },
});

export async function getKaryawans() {
    const res = await api.get("/karyawans");
    return res.data;
}

export async function getKaryawansById(id) {
  const res = await api.get(`/karyawans/${id}`);
  return res.data;
}

export async function deleteKaryawan(id) {
  const res = await api.delete(`/karyawans/${id}`);
  return res.data;
}

export async function createKaryawans(data) {
  const res = await api.post("/karyawans", data);
  return res.data;
}

export async function updateKaryawans(id, data) {
  const res = await api.patch(`/karyawans/${id}` , data);
  return res.data;
}
