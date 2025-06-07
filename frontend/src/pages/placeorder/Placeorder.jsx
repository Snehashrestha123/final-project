import React, { useState, useContext } from 'react';
import { Storecontext } from '../../context/Storecontext';
import { useNavigate } from 'react-router-dom';
import './placeorder.css';

const Placeorder = () => {
    const { cartItems, getTotalCartAmount, food_list, user } = useContext(Storecontext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deliveryDetails, setDeliveryDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        landmark: '',
        city: '',
        phone: ''
    });

    const orderItems = Object.entries(cartItems)
        .filter(([id, qty]) => Number(qty) > 0)
        .map(([id, qty]) => {
            const food = food_list.find(f => String(f._id) === String(id));
            return food ? {
                name: food.name,
                quantity: qty,
                price: food.price
            } : null;
        })
        .filter(Boolean);

    const isCartEmpty = orderItems.length === 0;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (orderItems.length === 0) {
            setError('Your cart is empty. Please add items before placing an order.');
            setLoading(false);
            return;
        }

        const orderPayload = {
            items: orderItems,
            totalAmount: getTotalCartAmount() + 2,
            deliveryDetails: {
                ...deliveryDetails,
                email: user?.email || deliveryDetails.email,
                name: user?.name || (deliveryDetails.firstName + " " + deliveryDetails.lastName)
    
            },
            paymentMethod: 'COD'
        };

        try {
            const response = await fetch('http://localhost:4000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderPayload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                setError(errorData.message || 'Failed to place order');
                setLoading(false);
                return;
            }
            navigate('/orders');
        } catch (err) {
            setError('Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="place-order-container">
            <div className="order-header">
                <h2>Place Your Order</h2>
                <p>Please provide your delivery details for COD</p>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="order-content">
                <form onSubmit={handleSubmit} className="delivery-form">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={deliveryDetails.firstName}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your first name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={deliveryDetails.lastName}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={deliveryDetails.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Delivery Address</label>
                        <textarea
                            id="address"
                            name="address"
                            value={deliveryDetails.address}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your complete address"
                            rows="3"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="landmark">Landmark (Optional)</label>
                        <input
                            type="text"
                            id="landmark"
                            name="landmark"
                            value={deliveryDetails.landmark}
                            onChange={handleInputChange}
                            placeholder="Enter nearby landmark"
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={deliveryDetails.city}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your city"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={deliveryDetails.phone}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your phone number"
                                pattern="[0-9]{10}"
                            />
                        </div>
                    </div>
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-item">
                            <span>Subtotal:</span>
                            <span>Rs. {getTotalCartAmount()}</span>
                        </div>
                        <div className="summary-item">
                            <span>Delivery Fee:</span>
                            <span>Rs. 2</span>
                        </div>
                        <div className="summary-item total">
                            <span>Total Amount:</span>
                            <span>Rs. {getTotalCartAmount() + 2}</span>
                        </div>
                        <p className="cod-note">
                            * You will pay Rs. {getTotalCartAmount() + 2} in cash when your order is delivered
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="place-order-btn"
                        disabled={loading}
                    >
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Placeorder;
