const db = require("../db/models/index");
const { Op } = require("sequelize");

const { Invoice, Company, InvoicePayment, Payment } = db;

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

/** Function to add payment status to each invoice */
function formatTableData(tableData) {
  for (let i = 0; i < tableData.rows.length; i++) {
    let paidAmount = 0;

    for (let j = 0; j < tableData.rows[i].dataValues.payments.length; j++) {
      paidAmount += Number(
        tableData.rows[i].dataValues.payments[j].dataValues.amount
      );
    }
    tableData.rows[i].dataValues.amountPaid = paidAmount;
  }

  tableData.rows.forEach((data) => {
    if (Number(data.dataValues.amountPaid) == 0) {
      data.dataValues["status"] = "Pending";
      data.dataValues["outstanding"] = data.dataValues.totalAmount;
    } else if (
      Number(data.dataValues.amountPaid) < Number(data.dataValues.totalAmount)
    ) {
      data.dataValues["status"] = "Partial Paid";
      data.dataValues["outstanding"] =
        Number(data.dataValues.totalAmount) -
        Number(data.dataValues.amountPaid);
    } else if (
      Number(data.dataValues.amountPaid) === Number(data.dataValues.totalAmount)
    ) {
      data.dataValues["status"] = "Paid";
      data.dataValues["outstanding"] = 0;
    }
  });

  return tableData;
}

async function getTableData(req, res) {
  const { page, size } = req.params;
  try {
    const tableData = await Invoice.findAndCountAll({
      include: [{ model: Company }, { model: Payment }],
      where: { isDraft: false },
      limit: size,
      offset: page * size,
      distinct: true,
      order: [["createdAt", "DESC"]],
    });
    const formattedData = formatTableData(tableData);

    return res.json(formattedData);
  } catch (e) {
    return res.status(400).json({ error: true, msg: err });
  }
}

function filterPaid(tableData) {
  let finalData = [];
  for (let i = 0; i < tableData.length; i++) {
    let paidAmount = 0;

    for (let j = 0; j < tableData[i].dataValues.payments.length; j++) {
      paidAmount += Number(
        tableData[i].dataValues.payments[j].dataValues.amount
      );
    }
    tableData[i].dataValues.amountPaid = paidAmount;
  }

  tableData.forEach((data) => {
    if (
      Number(data.dataValues.amountPaid) == 0 ||
      Number(data.dataValues.amountPaid) < Number(data.dataValues.totalAmount)
    ) {
      finalData.push(data);
    }
  });

  return finalData;
}

async function getAllFromCompany(req, res) {
  const { companyId } = req.params;
  try {
    const invoices = await Invoice.findAll({
      where: { companyId: companyId },
      include: [{ model: Payment }],
    });

    const finalInvoices = filterPaid(invoices);
    return res.json(finalInvoices);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function searchInvoiceByCopmpany(req, res) {
  const { searchText, page, size } = req.params;
  try {
    const invoices = await Invoice.findAndCountAll({
      where: { isDraft: false },
      limit: size,
      offset: page * size,
      distinct: true,
      order: [["createdAt", "DESC"]],
      include: [
        { model: Company, where: { name: { [Op.iLike]: `%${searchText}%` } } },
        { model: Payment },
      ],
    });

    const formattedData = formatTableData(invoices);

    return res.json(formattedData);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function searchInvoiceById(req, res) {
  const { searchText, page, size } = req.params;
  try {
    const invoices = await Invoice.findAndCountAll({
      where: { isDraft: false, id: searchText },
      limit: size,
      offset: page * size,
      distinct: true,
      order: [["createdAt", "DESC"]],
      include: [{ model: Company }, { model: Payment }],
    });

    const formattedData = formatTableData(invoices);

    return res.json(formattedData);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
  insertEmptyRow,
  updateRow,
  getTableData,
  getAllFromCompany,
  searchInvoiceByCopmpany,
  searchInvoiceById,
};
