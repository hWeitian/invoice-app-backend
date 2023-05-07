const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.BASEURL,
});

// importing Routers as created in Sequelize
const magazinesRouter = require("./routers/magazine");
const productsRouter = require("./routers/product");
const regionsRouter = require("./routers/region");
const companiesRouter = require("./routers/company");
const contactsRouter = require("./routers/contact");
const paymentsRouter = require("./routers/payment");
const exchangeRateRouter = require("./routers/exchangeRate");
const insertionOrderRouter = require("./routers/insertionOrder");
const invoiceRouter = require("./routers/invoice");
const orderRouter = require("./routers/order");
const creditNoteRouter = require("./routers/creditNote");
const creditItemRouter = require("./routers/creditItem");

const PORT = process.env.PORT || 3000;

const app = express();

// Enable CORS access to this server
app.use(cors());

// Auth0 authorization
app.use(checkJwt);

// Parsing to json
app.use(express.json());

// using the routers as imported in line 7 above
app.use("/magazines", magazinesRouter);
app.use("/products", productsRouter);
app.use("/regions", regionsRouter);
app.use("/companies", companiesRouter);
app.use("/contacts", contactsRouter);
app.use("/payments", paymentsRouter);
app.use("/exchange-rates", exchangeRateRouter);
app.use("/insertion-orders", insertionOrderRouter);
app.use("/invoices", invoiceRouter);
app.use("/orders", orderRouter);
app.use("/credit-notes", creditNoteRouter);
app.use("/credit-items", creditItemRouter);

app.listen(PORT, () => {
  console.log("Application listening to port 3000");
});
