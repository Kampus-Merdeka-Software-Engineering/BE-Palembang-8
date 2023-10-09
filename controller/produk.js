const db = require("../models");
//image upload
const multer = require("multer");
const path = require("path");
const { where } = require("sequelize");
const dtProduks = db.dtproduk;


//create main model
const Produks = db.produk;

//1. Create Produks
const addImage = async (req, res) => {
  let info = {
    image: req.file.path,
  };
  const produk = await Produks.create(info);
  res.status(200).send(produk);
  console.log(produk);
};


const addProduk = async (req, res) => {
  let info = {
    nama_produk: req.body.nama_produk,
    harga: req.body.harga,
    diskon: req.body.diskon,
    kode: req.body.kode,
    tanggal: req.body.tanggal,
    spesifikasi: req.body.spesifikasi,
    category_id: req.body.category_id,
    user_id: req.body.user_id,
    keterangan: req.body.keterangan,
    // image: req.file.path,
  };
  const produk = await Produks.create(info);
  res.status(200).send(produk);
  console.log(produk);
  // next();
};

//2. get all Produks

const getAllProduk = async (req, res) => {

  try {
    let Produk = await Produks.findAll({
      include: [
        { association: 'category' },
        {
           association: 'gambar' ,
          
        }
     ]
    });
  
    if (!Produk) {
      res.send(" post not found");
    }
    res.status(200).send(Produk);
  } catch (error) {
    res.json(error);
  }
};

const getProdukByCategoryId = async (req, res) => {

  try {
    let id = req.params.id;
    let Produk = await Produks.findOne({ where: { categoryId: id } }, {
      include: [
        { association: 'category' },
        {
           association: 'gambar' ,
          
        }
     ]
    });
  
    if (!Produk) {
      res.send("Produk Tidak Tersedia found");
    }
    res.status(200).send(Produk);
  } catch (error) {
    res.json(error);
  }
};



const getDetailProduk = async (req, res) => {

  try {
    let id = req.params.id;
    let Produk = await Produks.findByPk(id, {
      include: [
        { association: 'category' },
        {
           association: 'gambar' ,
          
        }
     ]
    });
  
    if (!Produk) {
      res.send(" post not found");
    }
    res.status(200).send(Produk);
  } catch (error) {
    res.json(error);
  }
};

//3. Update Produk post

const updateProduk = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(req.body);
    let info = {
        nama_produk: req.body.nama_produk,
        harga: req.body.harga,
        diskon: req.body.diskon,
        kode: req.body.kode,
        tanggal: req.body.tanggal,
        spesifikasi: req.body.spesifikasi,
        category_id: req.body.category_id,
        keterangan: req.body.keterangan,
        image: req.file.path,
    };
    if (req.file) {
      const img = req.file.path;
      info.image = img;
    }
    let Produk = await Produks.update(info, { where: { id: id } });
    console.log(Produk);
    res.status(200).send("Produk updated");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//4. Delete Produk post

const deleteProduk = async (req, res) => {
  let id = req.params.id;
  await Produks.destroy({ where: { id: id } });
  await db.dtproduk.destroy({ where: { ms_produks_id: id } });
  res.status(200).json("Produk has been deleted....");
};

// 8. Upload Image Controller

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

module.exports = {
  addProduk,
  getAllProduk,
  updateProduk,
  deleteProduk,
  upload,
  getDetailProduk,
  addImage,
  getProdukByCategoryId
};