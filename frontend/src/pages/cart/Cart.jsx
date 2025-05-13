import React, { useContext } from 'react'
import './Cart.css'
import { Storecontext } from '../../context/Storecontext'
import { food_list } from '../../assets/assets';
import { useNavigate } from 'react-router';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(Storecontext);
    const navigate = useNavigate();

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={item._id} className='cart-items-title cart-items-item'>
                                {/* <div className='cart-items-title cart-items-item'>  */}
                                <img src={url + "/images/" + item.image} alt="" />
                                <p>{item.name}</p>
                                <p>Rs.{item.price}</p>
                                <p>{cartItems[item._id]}</p>
                                <p>Rs.{item.price * cartItems[item._id]}</p>
                                <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                            </div>
                        )
                    }
                })}
            </div>
            <div className="cart-buttom">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>Rs.{getTotalCartAmount()}</p>
                        </div>
                        <hr />

                        <div className="cart-total-details">
                            <p>Delivery fee</p>
                            <p>Rs.{2}</p>
                        </div>
                        <hr />

                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>Rs.{getTotalCartAmount() + 2}</p>
                        </div>

                    </div>
                    <button onClick={() => navigate('/order')}>Proceed to checkout</button>
                </div>
            </div>

        </div>
    )
}

export default Cart
