"use strict";

// const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const initMagazine = require("./magazine");
const initProduct = require("./product");
const initRegion = require("./region");
const initCompany = require("./company");
const initContact = require("./contact");
const initPayment = require("./payment");
const initExchangeRate = require("./exchange_rate");
const initInsertionOrder = require("./insertion_order");
const initInvoice = require("./invoice");
const initInvoicePayment = require("./invoicePayment");
const initOrder = require("./order");
const initCreditNote = require("./credit_note");
const initCreditItem = require("./credit_item");
const initOrderRegion = require("./orderRegion");
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/database.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.Magazine = initMagazine(sequelize);
db.Product = initProduct(sequelize);
db.Region = initRegion(sequelize);
db.Company = initCompany(sequelize);
db.Contact = initContact(sequelize);
db.Payment = initPayment(sequelize);
db.ExchangeRate = initExchangeRate(sequelize);
db.InsertionOrder = initInsertionOrder(sequelize);
db.Invoice = initInvoice(sequelize);
db.InvoicePayment = initInvoicePayment(sequelize);
db.Order = initOrder(sequelize);
db.CreditNote = initCreditNote(sequelize);
db.CreditItem = initCreditItem(sequelize);
db.orderRegion = initOrderRegion(sequelize);

// One to many relationship between companies and contacts
// One company has many contacts
db.Company.hasMany(db.Contact);
db.Contact.belongsTo(db.Company);

// One to many relationship between companies and insertionOrders
// One company has many insertion orders
db.Company.hasMany(db.InsertionOrder);
db.InsertionOrder.belongsTo(db.Company);

// One to many relationship between contacts and insertionOrders
// One contact has many insertion orders
db.Contact.hasMany(db.InsertionOrder);
db.InsertionOrder.belongsTo(db.Contact);

// One to many relation between companies and invoices
// One company has many invoices
db.Company.hasMany(db.Invoice);
db.Invoice.belongsTo(db.Company);

// One to many relation between contacts and invoices
// One contact has many invoices
db.Contact.hasMany(db.Invoice);
db.Invoice.belongsTo(db.Contact);

// One to many relation between exchange rates and invoices
// One exchange rate has many invoices
db.ExchangeRate.hasMany(db.Invoice);
db.Invoice.belongsTo(db.ExchangeRate);

// Many to many relation between invoices and payments
// Once invoice has many payments and one payment can be for multiple invoices
db.Invoice.belongsToMany(db.Payment, { through: db.InvoicePayment });
db.Payment.belongsToMany(db.Invoice, { through: db.InvoicePayment });

// One to many relation between insertion orders and orders
// One insertion order has many orders but one order can only belong to one insertion order
db.InsertionOrder.hasMany(db.Order);
db.Order.belongsTo(db.InsertionOrder);

// One to many relation beween invoices and orders
// One invoice has many orders but one order can only belong to one invoice
db.Invoice.hasMany(db.Order);
db.Order.belongsTo(db.Invoice);

// One to many relation between products and orders
// One product has many orders but one order can only contain one product
db.Product.hasMany(db.Order);
db.Order.belongsTo(db.Product);

// One to many relation between magazines and orders
// One magazine has many orders but one order can only belong to one magazine
db.Magazine.hasMany(db.Order);
db.Order.belongsTo(db.Magazine);

// Many to many relation between orders and regions
// One order has many regions and one region has many orders
db.Order.belongsToMany(db.Region, { through: db.orderRegion });
db.Region.belongsToMany(db.Order, { through: db.orderRegion });

// One to many relation between exchange rates and credit notes
// One exchange rate has many credit notes but one credit note can only have one exchange rate
db.ExchangeRate.hasMany(db.CreditNote);
db.CreditNote.belongsTo(db.ExchangeRate);

// One to many relation between credit notes and credit items
// One credit note has many credit items but one credit item can only belong to one credit note
db.CreditNote.hasMany(db.CreditItem);
db.CreditItem.belongsTo(db.CreditNote);

// One to one relation between credit items and order
// One credit item can only belong to one order and vice-versa
db.CreditItem.belongsTo(db.CreditNote);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = { db, sequelize };
