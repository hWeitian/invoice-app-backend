const express = require("express");
const cors = require("cors");
require("dotenv").config();

// importing Routers as created in Sequelize
//const productsRouter = require("./routers/product");

const PORT = process.env.PORT || 3000;

const app = express();

// Enable CORS access to this server
app.use(cors());

// Parsing to json
app.use(express.json());

// using the routers as imported in line 4 above
//app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log("Application listening to port 3000");
});
