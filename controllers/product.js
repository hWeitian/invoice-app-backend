const db = require("../db/models/index");

const { Product } = db;

async function getAll(req, res) {
  try {
    const newProduct = await Product.findAll();
    return res.json(newProduct);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
};
