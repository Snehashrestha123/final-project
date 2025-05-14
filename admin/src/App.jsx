// import React from 'react'
// import Navbar from './components/Navbar/Navbar'
// import Sidebar from './components/Sidebar/Sidebar'
// import { Routes, Route } from 'react-router-dom';
// import Orders from './pages/Orders/Orders';
// import List from './pages/List/List';
// import Add from './pages/Add/Add';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Login from './components/Login/Login';

// const App = () => {
//   const [authenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check localStorage for auth
//     if (localStorage.getItem('admin-auth') === 'true') {
//       setAuthenticated(true);
//     }
//   }, []);

//   const handleLogin = () => setAuthenticated(true);

//   if (!authenticated) {
//     return <Login onLogin={handleLogin} />;
//   }

//   const url = "http://localhost:4000"

//   return (
//     <div>
//       <ToastContainer />
//       <Navbar />
//       <hr />
//       <div className="app-content">
//         <Sidebar />
//         <Routes>
//           <Route path="/add" element={<Add url={url} />} />
//           <Route path="/list" element={<List url={url} />} />
//           <Route path="/orders" element={<Orders url={url} />} />
//         </Routes>
//       </div>

//     </div>
//   )
// }

// export default App;

// ... existing imports ...
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Orders from './pages/Orders/Orders';
import List from './pages/List/List';
import Add from './pages/Add/Add';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('admin-auth') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => setAuthenticated(true);

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer />
      <Navbar onLogout={handleLogout} />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;