// import React from 'react';
// import './SignInModal.css';

// const SignInModal = ({ isOpen, onClose, onAdminLogin, onUserLogin }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h2>Sign In</h2>
//                 <button className="modal-btn admin" onClick={onAdminLogin}>Login as Admin</button>
//                 <button className="modal-btn user" onClick={onUserLogin}>Login as User</button>
//                 <button className="modal-close" onClick={onClose}>×</button>
//             </div>
//         </div>
//     );
// };

// export default SignInModal;

import React, { useState } from 'react';
import './SignInModal.css';

const SignInModal = ({ isOpen, onClose, onAdminLogin, onUserLogin }) => {
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    const handleUserLoginSubmit = (e) => {
        e.preventDefault();
        // You can add real authentication here if needed
        setShowUserLogin(false);
        onUserLogin();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {!showUserLogin ? (
                    <>
                        <h2>Sign In</h2>
                        <button className="modal-btn admin" onClick={onAdminLogin}>Login as Admin</button>
                        <button className="modal-btn user" onClick={() => setShowUserLogin(true)}>Login as User</button>
                        <button className="modal-close" onClick={onClose}>×</button>
                    </>
                ) : (
                    <>
                        <h2>User Login</h2>
                        <form className="user-login-form" onSubmit={handleUserLoginSubmit}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className="modal-btn user">Login</button>
                        </form>
                        <button className="modal-close" onClick={onClose}>×</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SignInModal;