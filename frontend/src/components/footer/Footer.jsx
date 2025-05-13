import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img  src={assets.logo1} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae necessitatibus quasi voluptatum eum natus, quisquam doloremque fuga ratione perferendis temporibus quia consequuntur deserunt impedit aspernatur porro expedita, ex nulla placeat.</p>
                    <div className="footer-social-icon">
                        <img src={assets.facebook_icon} alt="" />
                    </div>
                </div>

                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div className="footer-content-right">
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>+977- 212-838211</li>
                        <li>contact@order.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2025 Order.com- All Right Reserved.</p>
        </div>
    )
}

export default Footer
