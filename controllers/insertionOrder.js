const db = require("../db/models/index");
const { Op } = require("sequelize");

const { InsertionOrder, Order, Company, Contact, Product, Magazine } = db;

async function getAll(req, res) {
  try {
    const newInsertionOrder = await InsertionOrder.findAll();
    return res.json(newInsertionOrder);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getLatestIoNum(req, res) {
  try {
    const latestInvoiceNum = await InsertionOrder.findAll({
      limit: 1,
      order: [["id", "DESC"]],
    });
    return res.json(latestInvoiceNum);
  } catch (e) {
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
  const { page, size } = req.params;
  try {
    const tableData = await InsertionOrder.findAndCountAll({
      include: [
        { model: Order, include: [Product] },
        { model: Company },
        { model: Contact },
      ],
      where: { isDraft: false },
      limit: size,
      offset: page * size,
      distinct: true,
      order: [["createdAt", "DESC"]],
    });
    return res.json(tableData);
  } catch (e) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getDataForInvoice(req, res) {
  try {
    const data = await InsertionOrder.findAll({
      include: [
        { model: Company },
        { model: Contact },
        {
          model: Order,
          where: { invoiceId: null },
          include: [Product, Magazine],
        },
      ],
      where: { isDraft: false },
      order: [["id", "ASC"]],
    });
    // Add Company name in data for easy reference from frontend
    data.forEach((item) => {
      item.dataValues.label = `IO-${item.dataValues.id} - ${item.dataValues.company.name}`;
    });
    return res.json(data);
  } catch (e) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function updateStatus(req, res) {
  const { id } = req.params;
  const data = req.body;
  try {
    const newRow = await InsertionOrder.update(data, { where: { id: id } });
    return res.json(newRow);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function searchIoByCopmpany(req, res) {
  const { searchText, page, size } = req.params;
  try {
    const insertionOrders = await InsertionOrder.findAndCountAll({
      where: { isDraft: false },
      distinct: true,
      order: [["createdAt", "DESC"]],
      include: [
        { model: Company, where: { name: { [Op.iLike]: `%${searchText}%` } } },
        { model: Contact },
        { model: Order, include: [Product] },
      ],
    });

    let finalData = {
      count: insertionOrders.count,
      rows: [],
    };

    const pageNum = Number(page);
    const sizeNum = Number(size);

    if (insertionOrders.count > sizeNum) {
      const startIndex = pageNum * sizeNum;
      const endIndex = startIndex + (sizeNum - 1);

      for (let i = startIndex; i <= endIndex; i++) {
        if (insertionOrders.rows[i] !== undefined) {
          finalData.rows.push(insertionOrders.rows[i]);
        }
      }

      return res.json(finalData);
    } else {
      return res.json(insertionOrders);
    }

    return res.json(insertionOrders);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function searchIoById(req, res) {
  const { searchText, page, size } = req.params;
  try {
    const insertionOrders = await InsertionOrder.findAndCountAll({
      where: { isDraft: false, id: searchText },
      limit: size,
      offset: page * size,
      distinct: true,
      order: [["createdAt", "DESC"]],
      include: [
        { model: Company },
        { model: Contact },
        { model: Order, include: [Product] },
      ],
    });

    return res.json(insertionOrders);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
  insertEmptyRow,
  updateRow,
  getTableData,
  getDataForInvoice,
  updateStatus,
  searchIoByCopmpany,
  searchIoById,
  getLatestIoNum,
};
