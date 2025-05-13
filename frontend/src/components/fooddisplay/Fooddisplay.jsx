import React, { useContext } from 'react'
import './Fooddisplay.css'
import { Storecontext } from '../../context/Storecontext'
import Fooditem from '../fooditem/Fooditem'

const Fooddisplay = ({ category }) => {

    const { food_list } = useContext(Storecontext)

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    //this if stat filters the content like if clicked on salad only salad items will show
                    if (category === "All" || category === item.category) {
                     return <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    }
                }
                )
                }
            </div>
        </div>
    )
}

export default Fooddisplay




