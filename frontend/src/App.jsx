import { BrowserRouter, Route,  Routes } from "react-router";
import  HomePage  from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import KaryawanPage from "./pages/KaryawanPage";
import CreateKaryawan from "./pages/CreateKaryawan";
import EditKaryawan from "./pages/EditKaryawan";
import ReportKaryawans from "./pages/ReportKaryawans";
import DetailKaryawan from "./pages/DetailKaryawan";


function App() {
  return (
    <div>
      <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/products/create" element={<CreateProduct />} />        
        <Route path="/products/:id/edit" element={<EditProduct />} />
        <Route path="/karyawans" element={<KaryawanPage />} />
        <Route path="/karyawans/create" element={<CreateKaryawan />} />        
        <Route path="/karyawans/:id/edit" element={<EditKaryawan />} />
        <Route path="/laporan" element={<ReportKaryawans />} />
        <Route path="/karyawans/:id" element={<DetailKaryawan />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
