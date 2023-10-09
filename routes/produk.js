const Produk = require("../controller/produk");
// const uploadController = require("../controller/multiple.produk");
const router = require('express').Router()
const db = require("../models");
const auth = require("../middlewares/auth.js");
const multer = require("multer");
const path = require("path");
const dtProduks = db.dtproduk;
const Produks = db.produk;



//user router
router.post('/addProduk', Produk.addProduk);
router.get('/getAll' , Produk.getAllProduk);
router.get('/getById/:id' , Produk.getDetailProduk);
router.get('/getByCategory/:id' , Produk.getProdukByCategoryId);

router.put('/:id',   Produk.upload,Produk.updateProduk);
router.delete('/:id',  Produk.deleteProduk);


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
  });
  
  
  router.post('/uploadImage',  upload.array('images', 4),async  (req, res)=>{
  const data = req.files;

  for(var i = 0; i < data.length; i++ ){
  const produk = await dtProduks.create(data[i]);
  }
  // res.('/produk/addProduk');
  // res.status(200).send("Sukses Bro");

  addProduk(req, res);
  

  
  }, (error, req, res )=> {
    res.status(404).send([error.message]);
  
  });

  const addProduk = async (req, res) => {
    let info = {
      nama_produk: req.body.nama_produk,
      harga: req.body.harga,
      diskon: req.body.diskon,
      kode: req.body.kode,
      tanggal: req.body.tanggal,
      spesifikasi: req.body.spesifikasi,
      categoryId: req.body.categoryId,
      user_id: req.body.user_id,
      keterangan: req.body.keterangan,
      // image: req.file.path,
    };
    const produk = await Produks.create(info);
    res.status(200).send(produk);
    console.log(produk);
    // next();
  };


  router.put('/updateImage/:id',  upload.array('images', 4),async  (req, res)=>{
    let id = req.params.id;
    const data = req.files;
    await db.dtproduk.destroy({ where: { ms_produks_id: id } });

    for(var i = 0; i < data.length; i++ ){
    const produk = await dtProduks.create(data[i]);
    }
    // res.('/produk/addProduk');
    // res.status(200).send("Sukses Bro");
  
    updateProduk(req, res);
    
  
    
    }, (error, req, res )=> {
      res.status(404).send([error.message]);
    
    });
  
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
            categoryId: req.body.category_id,
            keterangan: req.body.keterangan,
            // image: req.file.path,
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
      // next();
    };
  


module.exports = router;