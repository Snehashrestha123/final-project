import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/header/header'
import Exploremenu from '../../components/exploremenu/Exploremenu'
import Fooddisplay from '../../components/fooddisplay/Fooddisplay'

const Home = () => {
    const [category, setCategory] = useState("All");
    return (
        <div>
            <Header />
            <Exploremenu category={category} setCategory={setCategory} />
            <Fooddisplay category={category}/>
        </div>
    )
}

export default Home;



