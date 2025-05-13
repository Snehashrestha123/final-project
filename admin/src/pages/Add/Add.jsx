import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
//import { useEffect } from 'react'

const Add = ({url}) => {
    
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
        // whenever we reload the page the defalut category will be salad as it is diplay 1st in the explore menu section

    })

    //  if only one value changed, it will help user update the changed value only.
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))   //you have taken old data and then set to new data that we get from event
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();   //to avoid reload of the page
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))    //string will be converted into number as in the above data set we have passed price as a string
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formData);  //we have created add api using post so we use post
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)  //image will be reset
            toast.success(response.data.message)    //gives pop up after food has been added

        } else {
            toast.error(response.data.message)
        }
    }
    //  useEffect(()=>{
    //     console.log(data);
    //  },[data])    //when dat awill be updated this function will be executed


    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col" >
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        {/* To help admin disply the picture */}
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    {/* To allow admin choose image */}
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    {/* to make controlled input field which means any changes made here will change the const value in the above section */}
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />

                </div>
                <div className="add-product-description flex-col">
                    <p>product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>

                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desert">Desert</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='' $20 />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default Add
