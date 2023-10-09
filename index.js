const express = require("express");
const app = express();
const router = require("./routes/router.js");
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const connection = require('./models/index')

app.use(cors({
  origin: "*", // Ini akan mengizinkan seluruh domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Metode HTTP yang diizinkan
  allowedHeaders: "Content-Type,Authorization", // Header yang diizinkan
}));

app.use(express.urlencoded({ extended: true }));
app.use("/", router);

// app.listen(5000, function () {
//   console.log(`Server running on http://localhost:5000`);
// });

//baru
const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", function(){
    console.log("server start on", port)
    connection.authenticate()
    .then(function(){
        console.log("Database terhubung")
    })
    .catch(function(err){
        console.log("Error saat koneksi ke database", err)
        process.exit()
    })
})



module.exports = app;