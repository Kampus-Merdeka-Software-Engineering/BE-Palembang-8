const express = require("express");
const app = express();
const router = require("./routes/router.js");
const cors = require('cors');

app.use(cors({
  origin: "*", // Ini akan mengizinkan seluruh domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Metode HTTP yang diizinkan
  allowedHeaders: "Content-Type,Authorization", // Header yang diizinkan
}));

app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.listen(5000, function () {
  console.log(`Server running on http://localhost:5000`);
});



module.exports = app;