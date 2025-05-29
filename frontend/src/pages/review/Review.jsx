import React, { useContext, useState, useEffect } from 'react';
import { Storecontext } from '../../context/Storecontext';
import { useNavigate } from 'react-router-dom';
import './review.css';

const Review = () => {
  const { token } = useContext(Storecontext);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch reviews on mount
  useEffect(() => {
    fetch('http://localhost:4000/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(() => setReviews([]));
  }, []);

  // Handle review submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!token) {
      setError('You must be logged in to post a review.');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: reviewText })
      });
      if (!response.ok) {
        const err = await response.json();
        setError(err.message || 'Failed to post review');
        setLoading(false);
        return;
      }
      const newReview = await response.json();
      setReviews([newReview, ...reviews]);
      setReviewText('');
    } catch {
      setError('Failed to post review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-page">
      <h2>Send Us Your Review</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <textarea
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          placeholder="Write your review about our restaurant or food..."
          required
          disabled={!token}
        />
        <button type="submit" disabled={!token || loading}>
          {loading ? 'Posting...' : 'Post Review'}
        </button>
        {!token && <div className="review-login-warning">You must be logged in to post a review.</div>}
        {error && <div className="review-error">{error}</div>}
      </form>
      <h3>What others say</h3>
      <div className="review-list">
        {reviews.length === 0 && <div>No reviews yet.</div>}
        {reviews.map((r, idx) => (
          <div className="review-item" key={r._id || idx}>
            <div className="review-user">{r.userName || 'Anonymous'}</div>
            <div className="review-text">{r.text || 'No review text.'}</div>
            <div className="review-date">
              {r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;