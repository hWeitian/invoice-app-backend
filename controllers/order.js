const db = require("../db/models/index");

const { Order, orderRegion } = db;

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

module.exports = {
  getAll,
  addOrders,
};
