// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// // import { food_list } from "../assets/assets";

// export const Storecontext = createContext(null);

// const StorecontextProvider = (props) => {

//     const [cartItems, setCartItems] = useState({});
//     const url = "http://localhost:4000"
//     const [token, setToken] = useState("");
//     const [food_list, setFoodList] = useState([])  //fetching the data of the menu from the database

//     //add to cart
//     const addToCart = async (itemId) => {
//         if (!cartItems[itemId]) {             //create new entry for our food products
//             setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
//         }
//         else {                                //if product is already avaiable and it will increase the value by 1
//             setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
//         }
//         if (token) {             //this means that the user is logged in
//             await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
//         }
//     }


//     const removeFromCart = async (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//         if (token) {             //this means that the user is logged in
//             await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
//         }
//     }


//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for (const item in cartItems) {   //cart item is obejct so forin loop
//             if (cartItems[item] > 0) {
//                 let itemInfo = food_list.find((product) => product._id === item)
//                 totalAmount += itemInfo.price * cartItems[item];
//             }

//         }
//         return totalAmount;
//     }

//     const fetchFoodList = async () => {
//         try {
//             const response = await axios.get(url + "/api/food/list");
//             if (response.data.success) {
//                 setFoodList(response.data.data);
//             } else {
//                 console.error("Failed to fetch food list:", response.data.message);
//             }
//         } catch (error) {
//             console.error("Error fetching food list:", error);
//         }
//     }

//     const loadCartData = async (token) => {
//         const response = await axios.post(url + "/api/cart/get", {}, {
//             headers: { token: token }
//         });
//         setCartItems(response.data.cartData);
//     }

//     useEffect(() => {
//         async function loadData() {
//             try {
//                 await fetchFoodList();
//                 const storedToken = localStorage.getItem("token");
//                 if (storedToken) {
//                     setToken(storedToken);
//                     await loadCartData(storedToken);
//                 }
//             } catch (error) {
//                 console.error("Error loading data:", error);
//             }
//         }
//         loadData();
//     }, [])

//     const contextValue = {
//         food_list,
//         cartItems,
//         setCartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount,
//         url,
//         token,
//         setToken
//     }

//     return (
//         <Storecontext.Provider value={contextValue}>
//             {props.children}
//         </Storecontext.Provider>

//     )
// }

// export default StorecontextProvider;







import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Storecontext = createContext(null);

const StorecontextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"
    // Initialize token from localStorage
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [food_list, setFoodList] = useState([]);


    //add to cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            if (response.data.success) {
                setFoodList(response.data.data);
            } else {
                console.error("Failed to fetch food list:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, {
                headers: { token: token }
            });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    }

    useEffect(() => {
        async function loadData() {
            try {
                await fetchFoodList();
             
                if (token) {
                    await loadCartData(token);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            }
        }
        loadData();
    }, [token]); 

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        
    }

    return (
        <Storecontext.Provider value={contextValue}>
            {props.children}
        </Storecontext.Provider>
    )
}

export default StorecontextProvider;