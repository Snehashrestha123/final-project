import React, { useEffect, useState, useContext } from 'react';
import { Storecontext } from '../../context/Storecontext';
import './Order.css';

const Order = () => {
  const { token } = useContext(Storecontext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/orders', { 
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="order-history-container">
      <h2>Your Orders</h2>
      {loading ? (
        <div className="order-loading">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="order-empty">You have not placed any orders yet.</div>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <span className="order-id">Order #{order._id.slice(-6)}</span>
                <span className={`order-status ${order.status}`}>{order.status}</span>
              </div>
              <div className="order-details">
                <div>
                  <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                </div>
                <div>
                  <strong>Delivery Address:</strong> {order.deliveryDetails?.address}
                </div>
                <div>
                  <strong>Payment:</strong> {order.paymentMethod}
                </div>
                <div>
                  <strong>Total:</strong> Rs. {order.totalAmount}
                </div>
              </div>
              <div className="order-items">
                <strong>Items:</strong>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} x{item.quantity} - Rs. {item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;