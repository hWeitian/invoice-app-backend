const { db } = require("../db/models/index");

const { Payment, InvoicePayment, Invoice } = db;

async function getAll(req, res) {
  try {
    const newPayment = await Payment.findAll();
    return res.json(newPayment);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function addOne(req, res) {
  const data = req.body;

  const payments = data.paymentItems.map((item) => {
    return {
      payee: data.payee,
      paymentDate: data.date,
      amount: item.amount,
      url: data.url,
    };
  });

  try {
    const newPayments = await Payment.bulkCreate(payments);
    const newInvoicePayments = newPayments.map((payment, index) => {
      return {
        invoiceId: data.paymentItems[index].invoices.id,
        paymentId: payment.dataValues.id,
      };
    });

    const addedPayment = await InvoicePayment.bulkCreate(newInvoicePayments);
    return res.json(addedPayment);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getForOneInvoice(req, res) {
  const { id } = req.params;
  try {
    const allPayments = await Payment.findAll({
      include: [{ model: Invoice, where: { id: id } }],
    });
    return res.json(allPayments);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function deleteOne(req, res) {
  const { id } = req.params;
  const { url } = req.body;
  try {
    const { count, rows } = await Payment.findAndCountAll({
      where: { url: url },
    });
    const response = await Payment.destroy({
      where: { id: id },
    });
    if (count > 1) {
      return res.send("Not Unique");
    } else {
      return res.send("Unique");
    }
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

module.exports = {
  getAll,
  addOne,
  getForOneInvoice,
  deleteOne,
};
