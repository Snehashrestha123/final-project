import React from 'react'
import './List.css'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const List = ({url}) => {
    const [list, setList] = useState([]);    //state variable
    
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            console.log("API Response:", response.data); // Debug log
            if(response.data.success){
                setList(response.data.data);
            }
            else{
                toast.error("Error fetching food list");
            }
        } catch (error) {
            console.error("Error fetching list:", error);
            toast.error("Failed to fetch food list");
        }
    }

    const removeFood = async (foodId) => {
        const isConfirmed = window.confirm("Do you want to delete this food item?");
        
        if (!isConfirmed) {
            return; 
        }

        try {
            const response = await axios.post(`${url}/api/food/remove`, {id: foodId});
            await fetchList();
            if(response.data.success){
                toast.success(response.data.message)
            }
            else{
                toast.error("Error removing food item");
            }
        } catch (error) {
            console.error("Error removing food:", error);
            toast.error("Failed to remove food item");
        }
    }

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return(
                        <div key={index} className='list-table-format'>
                            <img src={`${url}/images/` + item.image} alt={item.name} /> 
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>Rs.{item.price}</p>
                            <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List