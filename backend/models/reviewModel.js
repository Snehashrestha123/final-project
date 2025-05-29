import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({
  userName: { type: String, default: 'Anonymous' },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Review = mongoose.model('Review', reviewSchema);
export default Review;