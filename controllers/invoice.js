const db = require("../db/models/index");

const { Invoice } = db;

async function getAll(req, res) {
  try {
    const newInvoice = await Invoice.findAll();
    return res.json(newInvoice);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function insertEmptyRow(req, res) {
  const data = req.body;
  try {
    const newRow = await Invoice.create(data);
    return res.json(newRow);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function updateRow(req, res) {
  const { id } = req.params;
  const data = req.body;
  const newData = {
    companyId: data.companies.id,
    contactId: data.contacts.id,
    invoiceDate: data.invoiceDate,
    dueDate: data.dueDate,
    discount: data.discount,
    netAmount: data.netAmount,
    totalAmount: data.totalAmount,
    usdGst: data.usdGst,
    sgdGst: data.sgdGst,
    exchangeRateId: data.exchangeRate.id,
    amountPaid: 0,
    adminId: data.adminId,
    isDraft: false,
    url: data.url,
    purchaseOrder: data.purchaseOrder,
  };
  try {
    const newRow = await Invoice.update(newData, { where: { id: id } });
    return res.json(newRow);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
  insertEmptyRow,
  updateRow,
};
