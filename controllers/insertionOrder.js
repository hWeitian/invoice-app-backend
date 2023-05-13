const db = require("../db/models/index");

const { InsertionOrder, Order, Company, Contact, Product } = db;

async function getAll(req, res) {
  try {
    const newInsertionOrder = await InsertionOrder.findAll();
    return res.json(newInsertionOrder);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function insertEmptyRow(req, res) {
  const data = req.body;
  try {
    const newRow = await InsertionOrder.create(data);
    return res.json(newRow);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function updateRow(req, res) {
  const { id } = req.params;
  const data = req.body;
  const newData = {
    date: data.ioDate,
    companyId: data.companies.id,
    contactId: data.contacts.id,
    adminId: data.adminId,
    discount: data.discount,
    usdGst: data.usdGst,
    netAmount: data.netAmount,
    totalAmount: data.totalAmount,
    isSigned: false,
    isDraft: false,
    url: data.url,
  };
  try {
    const newRow = await InsertionOrder.update(newData, { where: { id: id } });
    return res.json(newRow);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getTableData(req, res) {
  try {
    const tableData = await InsertionOrder.findAll({
      include: [
        { model: Order, include: [Product] },
        { model: Company },
        { model: Contact },
      ],
      where: { isDraft: false },
    });
    return res.json(tableData);
  } catch (e) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
  insertEmptyRow,
  updateRow,
  getTableData,
};
