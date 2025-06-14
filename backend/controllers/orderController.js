import Order from '../models/orderModel.js';


export const createOrder = async (req, res) => {
  try {
    if (!req.body.deliveryDetails.email) {
      return res.status(400).json({ message: "Email is required in deliveryDetails" });
    }
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const getOrders = async (req, res) => {
  console.log("getOrders (backend) – query:", req.query);
  let filter = {};
  if (req.query.email) {
    filter = { "deliveryDetails.email": req.query.email };
  }
  try {
    const orders = await Order.find(filter);
    console.log("getOrders (backend) – orders returned:", orders);
    res.json(orders);
  } catch (err) {
    console.error("getOrders (backend) – error:", err);
    res.status(500).json({ message: err.message });
  }
};



export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};










