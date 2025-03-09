import React from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import { useState } from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
const Home = () => {
  const [category, setcategory] = useState("All")
  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setcategory={setcategory}/>
        <FoodDisplay category={category}/>
    </div>
  )
}

export default Home