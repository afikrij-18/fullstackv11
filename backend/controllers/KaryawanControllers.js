import Karyawans from "../models/KaryawanModels.js";


// menampilkan seluruh data karyawan
export const getKaryawans = async(req, res) => {
  try {
    const response = await Karyawans.findAll();
    res.status(200).json(response);

  } catch (error) {
    console.log(error.message);
  }
}


// menampilkan data karyawan berdasarkan id
export const getKaryawansById = async(req, res) => {
  try {
    const response = await Karyawans.findOne( { 
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(response);

  } catch (error) {
    console.log(error.message);
  }
}

// menambahkan data karyawan
export const createKaryawan = async(req, res) => {
  try {
    // const { nomorkaryawan, nama, jeniskelamin, jabatan, pendidikan } = req.body;
    await Karyawans.create(req.body);
    res.status(201).json({ msg : "New Karyawan Added"});

  } catch (error) {
    console.log(error.message);
  }
}

// mengedit karyawan berdasarkan nomorkaryawan
export const updateKaryawan = async(req, res) => {
  try {
    await Karyawans.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ msg : "Karyawan updated"});

  } catch (error) {
    console.log(error.message);
  }
}

// delete karyawan berdasarkan id
export const deleteKaryawan = async(req, res) => {
  try {
    await Karyawans.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ msg : "Karyawan deleted"});

  } catch (error) {
    console.log(error.message);
  }
}

//get karyawan berdasarkan jabatan
export const getKaryawansByJabatan = async (req, res) => {
  try {
    const response = await Karyawans.findAll({
      where: {
        jabatan: req.params.jabatan,
      }
    })
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};


//mengedit field tertentu pada tabel karyawan
export const updateGajiKaryawan = async (req, res) => {
  try {
        const { gaji } = req.body;
    const data = await Karyawans.update({ gaji: gaji }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({msg: "Gaji karyawan sudah diperbarui."})

    if (!data) return res.status(404).json({msg: "karyawan tidak ditemukan"});


  } catch (error) {
    console.log(error.message);    
  }
}