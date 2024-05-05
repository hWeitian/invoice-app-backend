const { raw } = require("express");
const { db, sequelize } = require("../db/models/index");
const { Op, where } = require("sequelize");

const { Invoice, Company, InvoicePayment, Payment, ExchangeRate, Order } = db;

async function getAll(req, res) {
  try {
    const invoices = await sequelize.query(
      `SELECT inv.id as "Invoice Number", inv.invoice_date as "Invoice Date", c.name as "Company Name", magazines.month || ' ' || magazines.year as "Issue", orders.inv_description as "Item Description", orders.insertion_order_id as "Insertion Order", inv.discount as "Discount", inv.total_amount as "Sub Total", inv.usd_gst as "GST in USD", inv.net_amount as "Total Amount", inv.due_date as "Due Date", inv.amount_paid as "Amount Paid", inv.purchase_order as "Purchase Order", inv.url as "Link", inv.sgd_gst as "GST in SGD", rates.rate as "Exchange Rate", payments.payee as "Payee", payments.amount as "Paid Amount", inv.created_at as "Created At", inv.updated_at as "Updated At" FROM invoices as "inv" JOIN exchange_rates as rates ON rates.id = inv.exchange_rate_id JOIN companies as c ON c.id = inv.company_id JOIN orders on orders.invoice_id = inv.id LEFT JOIN "invoicePayments" ON "invoicePayments".invoice_id = inv.id LEFT JOIN payments ON payments.id = "invoicePayments".payment_id LEFT JOIN magazines ON magazines.id = orders.magazine_id;`,
      {
        model: Invoice,
        mapToModel: true, // pass true here if you have any mapped fields
      }
    );
    return res.json(invoices);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getLatestInvNum(req, res) {
  try {
    const latestInv = await Invoice.findAll({
      limit: 1,
      order: [["id", "DESC"]],
    });
    return res.json(latestInv);
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
      distinct: true,
      order: [["createdAt", "DESC"]],
      include: [
        { model: Company, where: { name: { [Op.iLike]: `%${searchText}%` } } },
        { model: Payment },
      ],
    });

    let finalData = {
      count: invoices.count,
      rows: [],
    };

    const pageNum = Number(page);
    const sizeNum = Number(size);

    if (invoices.count > sizeNum) {
      const startIndex = pageNum * sizeNum;
      const endIndex = startIndex + (sizeNum - 1);

      for (let i = startIndex; i <= endIndex; i++) {
        if (invoices.rows[i] !== undefined) {
          finalData.rows.push(invoices.rows[i]);
        }
      }

      const formattedData = formatTableData(finalData);
      return res.json(formattedData);
    } else {
      const formattedData = formatTableData(invoices);
      return res.json(formattedData);
    }
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

async function deleteInvoice(req, res) {
  const { invoiceId } = req.params;
  try {
    let orderInSelectedInvoiceWithIO = {};
    let updateOrderPromise;
    let deleteOrderPromise;

    const ordersIdInSelectedInvoiceWithoutIO = [];
    const id = invoiceId.split(".")[0];

    const ordersInSelectedInvoice = await Order.findAll({
      where: { invoiceId: id },
      raw: true,
    });

    // Split orders in invoice into orders related to an insertion order or orders not related to an insertion order
    ordersInSelectedInvoice.forEach((order) => {
      if (order.insertionOrderId != null) {
        order.invoiceId = null;
        orderInSelectedInvoiceWithIO = order;
      } else {
        ordersIdInSelectedInvoiceWithoutIO.push(order.id);
      }
    });

    // Orders related to an IO will be updated (invoice number will be set to null)
    if (Object.keys(orderInSelectedInvoiceWithIO).length > 0) {
      updateOrderPromise = updateOrder(
        orderInSelectedInvoiceWithIO,
        orderInSelectedInvoiceWithIO.id
      );
    }

    // Orders not related to an IO will be deleted
    if (ordersIdInSelectedInvoiceWithoutIO.length > 0) {
      deleteOrderPromise = deleteOrder(ordersIdInSelectedInvoiceWithoutIO);
    }

    // Run all promises together
    await Promise.all([updateOrderPromise, deleteOrderPromise]);

    // Delete invoice
    await Invoice.destroy({
      where: {
        id: id,
      },
    });

    // Foreign key constrain in Orders table
    return res.status(200).json({ msg: "Delete Successful" });
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

/**
 * Update an order by replacing it with a new order oject
 * @async
 * @param {object} newOrderObject new order object
 * @param {number} orderId ID of the order to be updated
 * @returns {promise}
 */
async function updateOrder(newOrderObject, orderId) {
  return Order.update(newOrderObject, {
    where: {
      id: orderId,
    },
  });
}

/**
 * Delete an order
 * @async
 * @param {array} orderId An array of the order IDs to be deleted
 * @returns {promise}
 */
async function deleteOrder(orderId) {
  return Order.destroy({
    where: { id: orderId },
  });
}

module.exports = {
  getAll,
  insertEmptyRow,
  updateRow,
  getTableData,
  getAllFromCompany,
  searchInvoiceByCopmpany,
  searchInvoiceById,
  getLatestInvNum,
  deleteInvoice,
};
