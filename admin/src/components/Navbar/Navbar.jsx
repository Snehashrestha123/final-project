// import React from 'react'
// import "./Navbar.css"
// import {assets} from '../../assets/assets'

// const Navbar = () => {
//   return (
//     <div className='navbar'> 
//         <p>Welcome to admin page</p>
//         <img className='logo1' src={assets.logo1} alt="" />
//         <img className='profile' src={assets.profile_image} alt="" />
      
//     </div>
//   )
// }

// export default Navbar





// ... existing imports ...
import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets'

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img className='logo1' src={assets.logo1} alt="" />
      </div>
      <div className="navbar-title">
        Welcome to admin page
      </div>
      <div className="navbar-actions">
        {onLogout && (
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        )}
       <img className='profile' src={assets.profile_image} alt="" />
      </div>
    </nav>
  );
};

export default Navbar;