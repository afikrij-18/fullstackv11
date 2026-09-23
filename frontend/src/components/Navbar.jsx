function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl ml-[10%]">Home</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <a href="/karyawans">Karyawan</a>
          </li>
          <li>
            <a href="/laporan">Laporan</a>
          </li>
          
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
