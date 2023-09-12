const { db, sequelize } = require("../db/models/index");
const { Op } = require("sequelize");

const { InsertionOrder, Order, Company, Contact, Product, Magazine } = db;

async function getAll(req, res) {
  try {
    const insertionOrders = await sequelize.query(
      `SELECT io.id as "Insertion Order Number", io.date as "Date", c.name as "Company Name", c.billing_address as "Company Address", contacts.first_name || ' ' || contacts.last_name as "Contact Person", contacts.email as "Email", orders.position as "Position", products.name as "Ad Size", orders.cost as "Gross Amount", io.discount as "Discount", io.net_amount as "Net Amount", io.usd_gst as "GST in USD", io.total_amount as "Total Amount", orders.sales_note as "Sales Note", string_agg(regions.name, ',') as "Regions", orders.colour as "Colour" FROM insertion_orders as io JOIN companies as c ON c.id = io.company_id JOIN contacts ON contacts.id = io.contact_id JOIN orders ON orders.insertion_order_id = io.id LEFT JOIN products ON products.id = orders.product_id JOIN "orderRegions" ON "orderRegions".order_id = orders.id JOIN regions ON regions.id = "orderRegions".region_id GROUP BY io.id, io.date, c.name, c.billing_address, contacts.first_name, contacts.last_name, contacts.email, orders.position, products.name, orders.cost, io.discount, io.net_amount, io.usd_gst, io.total_amount, orders.sales_note, orders.colour;`,
      {
        model: InsertionOrder,
        mapToModel: true, // pass true here if you have any mapped fields
      }
    );
    return res.json(insertionOrders);
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
  console.log("At insert empty Row");
  const data = req.body;
  try {
    const newRow = await InsertionOrder.create(data);
    return res.json(newRow);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function updateRow(req, res) {
  console.log("At update Row");
  const { id } = req.params;
  const data = req.body;
  console.log(data);
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

async function createInsertionOrder(req, res) {
  console.log("At create insertion Row");
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
    const newRow = await InsertionOrder.create(newData);
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
  createInsertionOrder,
};
