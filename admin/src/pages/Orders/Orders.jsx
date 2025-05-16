// import React from 'react'
// import './Orders.css'

// const Orders = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default Orders


// ... existing imports ...
import React, { useEffect, useState } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("fetching orders (admin panel)…");
    fetch("http://localhost:4000/api/orders")
      .then(res => res.json())
      .then(data => {
        console.log("fetch (admin panel) – orders returned:", data);
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("fetch (admin panel) – error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="orders-container">
      <h2>All Orders</h2>
      <div className="orders-list">
        {/* {orders.map(order => (
          <div className="order-box" key={order._id}>
            <div className="order-header">
              <span className="order-id">Order ID: {order._id}</span>
              <span className="order-status">{order.status}</span>
            </div>
            <div className="order-user">User: {order.user?.name || 'N/A'}</div>
            <div className="order-items">
              <strong>Items:</strong>
              <ul>
                {order.items.map(item => (
                  <li key={item._id}>{item.name} x {item.quantity}</li>
                ))}
              </ul>
            </div>
            <div className="order-date">
              Date: {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>
        ))} */}
        {orders.map(order => (
          <div className="order-box" key={order._id}>
            <div className="order-header">
              <span className="order-id">Order ID: {order._id}</span>
              <span className="order-status">{order.status}</span>
            </div>
            {/* Show user name and address */}
            <div className="order-user">
               <strong>User Name:</strong> {order.deliveryDetails?.name || 'N/A'}
            </div>
            {/* <div className="order-user">
              <strong>Delivery Address:</strong> {order.user?.address || 'N/A'}
            </div> */}
            <div className="order-items">
              <strong>Items:</strong>
              <ul>
                {order.items.map(item => (
                  <li key={item._id}>{item.name} x {item.quantity}</li>
                ))}
              </ul>
            </div>
            <div className="order-date">
              Date: {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;