import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrders);

// router.get('/my-orders', async (req, res) => {
//   const { email } = req.query;
//   if (!email) return res.status(400).json({ message: "Email required" });
//   try {
//     const orders = await getOrders.find({ "deliveryDetails.email": email });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });
router.get('/:id', getOrderById);
router.patch('/:id', updateOrderStatus);


export default router;