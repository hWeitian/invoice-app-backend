const db = require("../db/models/index");

const { Payment, InvoicePayment } = db;

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

module.exports = {
  getAll,
  addOne,
};
