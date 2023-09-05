const { db } = require("../db/models/index");
const { Op } = require("sequelize");

const { Order, orderRegion, Region, Invoice, Company, Product, Payment } = db;

async function getAll(req, res) {
  try {
    const newOrder = await Order.findAll();
    return res.json(newOrder);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function addOrders(req, res) {
  const data = req.body;
  const orders = data.orderItems;
  // If there are multiple orders, do the following
  if (orders.length > 1) {
    let bulkData = [];
    orders.forEach((order, index) => {
      const newData = {
        magazineId: data.magazine.id,
        productId: order.products.id,
        colour: order.colour,
        position: order.position,
        pages: null,
        invDescription: null,
        salesNote: data.notes,
        cost: order.amount,
        insertionOrderId: data.insertionId,
        invoiceId: null,
        index: index,
      };
      bulkData.push(newData);
    });
    try {
      // Insert the data into Orders table
      const newOrder = await Order.bulkCreate(bulkData);
      let bulkOrderRegionData = [];
      for (let i = 0; i < newOrder.length; i++) {
        const regions = orders[i].regions;
        for (let j = 0; j < regions.length; j++) {
          const obj = {
            regionId: regions[j].id,
            orderId: newOrder[i].dataValues.id,
          };
          bulkOrderRegionData.push(obj);
        }
      }
      const response = await orderRegion.bulkCreate(bulkOrderRegionData);
      return res.json(response);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  } else {
    // If there is only 1 order item, do the following
    const newData = {
      magazineId: data.magazine.id,
      productId: orders[0].products.id,
      colour: orders[0].colour,
      position: orders[0].position,
      pages: null,
      invDescription: null,
      salesNote: data.notes,
      cost: orders[0].amount,
      insertionOrderId: data.insertionId,
      invoiceId: null,
      index: 0,
    };
    try {
      // Insert data into Orders table
      const newOrder = await Order.create(newData);
      // Check the number of regions the order item belongs to
      if (orders[0].regions.length === 1) {
        // If order item only has 1 region, do the following
        const newOrderRegion = {
          regionId: orders[0].regions[0].id,
          orderId: newOrder.dataValues.id,
        };
        const response = await orderRegion.create(newOrderRegion);
        return res.json(response);
      } else {
        // If order item has multiple regions, do the following
        let bulkOrderRegionData = [];
        const regions = orders[0].regions;
        regions.forEach((region) => {
          const newOrderRegion = {
            regionId: region.id,
            orderId: newOrder.dataValues.id,
          };
          bulkOrderRegionData.push(newOrderRegion);
        });
        const response = await orderRegion.bulkCreate(bulkOrderRegionData);
        return res.json(response);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

async function addOrUpdate(req, res) {
  const data = req.body;
  let dataToCreate = [];
  let newDataToCreate = [];
  let idToUpdate = [];
  let idToUpdateData = [];

  // console.log(data);

  // Separate the invoiceItems into 2 categories
  // idToUpdate are items that already exist in the database
  // dataToCreate are items that do not exist in the database
  data.invoiceItems.forEach((item) => {
    if (item.id !== "") {
      idToUpdate.push(item.id);
      idToUpdateData.push(item);
    } else {
      dataToCreate.push(item);
    }
  });

  // console.log(dataToCreate);

  // If there are new items to be added to the database,
  // create each row according to the fields
  if (dataToCreate.length > 0) {
    newDataToCreate = dataToCreate.map((item) => {
      return {
        magazineId: null,
        productId: null,
        colour: null,
        position: null,
        pages: null,
        invDescription: item.description,
        salesNote: null,
        cost: item.amount,
        insertionOrderId: null,
        invoiceId: data.invoiceNum,
        index: 0,
      };
    });
  }

  try {
    // If there are items to update, do the following
    if (idToUpdate.length > 0) {
      const toUpdate = await Order.findAll({ where: { id: idToUpdate } });
      const dataToUpdate = toUpdate.map((item) => item.dataValues);

      const updatedData = dataToUpdate.map((item, index) => {
        item.invoiceId = data.invoiceNum;
        if (item.id === idToUpdateData[index].id) {
          item.invDescription = idToUpdateData[index].description;
        }
        return item;
      });

      await Order.bulkCreate(updatedData, {
        updateOnDuplicate: ["invoiceId", "invDescription"],
        where: { id: ["id"] },
      });
    }

    // If there are new items to be added into the database, do the following
    if (newDataToCreate.length > 0) {
      await Order.bulkCreate(newDataToCreate);
    }
    return res.json({ message: "update successfull" });
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getDataForOverview(req, res) {
  const { id } = req.params;
  try {
    const tableData = await Order.findAll({
      where: { magazineId: id },
      include: [
        {
          model: Invoice,
          where: { isDraft: false },
          include: [{ model: Company }, { model: Payment }],
        },
      ],
    });

    for (let i = 0; i < tableData.length; i++) {
      let paidAmount = 0;

      for (
        let j = 0;
        j < tableData[i].dataValues.invoice.payments.length;
        j++
      ) {
        paidAmount += Number(
          tableData[i].dataValues.invoice.payments[j].dataValues.amount
        );
      }
      tableData[i].dataValues.invoice.amountPaid = paidAmount;
    }

    return res.json(tableData);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

async function getDataforPagination(req, res) {
  const { page, size, id, regions } = req.params;
  const regionsArray = splitRegions(regions);
  try {
    const tableData = await Order.findAndCountAll({
      where: { magazineId: id },
      include: [
        {
          model: Region,
          where: {
            name: {
              [Op.or]: regionsArray,
            },
          },
        },
        {
          model: Invoice,
          where: { isDraft: false },
          include: [{ model: Company }, { model: Payment }],
        },
        { model: Product },
      ],
      limit: size,
      offset: page * size,
      distinct: true,
    });

    for (let i = 0; i < tableData.rows.length; i++) {
      let paidAmount = 0;

      for (
        let j = 0;
        j < tableData.rows[i].dataValues.invoice.payments.length;
        j++
      ) {
        paidAmount += Number(
          tableData.rows[i].dataValues.invoice.payments[j].dataValues.amount
        );
      }
      tableData.rows[i].dataValues.invoice.amountPaid = paidAmount;
    }

    tableData.rows.forEach((data) => {
      if (Number(data.dataValues.invoice.amountPaid) == 0) {
        data.dataValues["status"] = "Pending";
      } else if (
        Number(data.dataValues.invoice.amountPaid) <
        Number(data.dataValues.invoice.totalAmount)
      ) {
        data.dataValues["status"] = "Partial Paid";
      } else if (
        Number(data.dataValues.invoice.amountPaid) ===
        Number(data.dataValues.invoice.totalAmount)
      ) {
        data.dataValues["status"] = "Paid";
      }
    });

    return res.json(tableData);
  } catch (err) {
    return res.status(400).json({ error: true, msg: err });
  }
}

function splitRegions(regions) {
  return regions.split("&");
}

module.exports = {
  getAll,
  addOrders,
  addOrUpdate,
  getDataforPagination,
  getDataForOverview,
};
