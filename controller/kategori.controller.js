const db = require("../models");
const multer = require("multer");
const path = require("path");

const Categoryku = db.category;




  const createCategory = async (req, res) => {
    // if (Number(decodedId) === Number(req.params.id)) {

    let info = {
      category_name: req.body.category_name,
      picture: req.file.path,
      
    };
    const categoryName = await Categoryku.create(info);
    res.status(200).send(categoryName);
    console.log(categoryName);
  };
  

  
  
  const readCategory =  async (req, res) =>{
    try {
      let category = await Categoryku.findAll({});
  
      if (!category) {
        res.send("Category post not found");
      }
      res.status(200).send(category);
    } catch (error) {
      res.json(error);
    }
      // let decodedId = req.decoded.id;
  
      // if (Number(decodedId) === Number(req.params.id)) {
      } 
      // else {
      //     res.json({
      //       message: "Ini bukan data Anda",
      //     });
      //   }
  // }


  const updateCategory = async (req, res) => {

    try {
      let id = req.params.id;
      console.log(req.body);
      let info = {
      category_name: req.body.category_name,
      };
      if (req.file) {
        const img = req.file.path;
        info.image = img;
      }
      let users = await Categoryku.update(info, { where: { id: id } });
      console.log(users);
      res.status(200).send("Kategori updated");
    } catch (err) {
      res.status(500).send({ message: err.message });
    }

    
  };

  const deleteCategory = async (req, res) => {
    let id = req.params.id;
    await Categoryku.destroy({ where: { id: id } });
    res.status(200).json("Kategori has been deleted....");
  };


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
      createCategory,
      readCategory,
      updateCategory,
      deleteCategory,
      upload,

  };