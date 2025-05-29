import express from 'express';
import Review from '../models/reviewModel.js';
import authMiddleware from '../middleware/auth.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});

router.post('/', authMiddleware, async (req, res) => {
  const userName = req.user?.name || 'Anonymous';
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Review text is required' });
  const review = new Review({ userName, text });
  await review.save();
  res.status(201).json(review);
});

export default router;