import { createContext, useEffect, useState } from 'react';
// import { food_list } from '../assets/assets';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props)=>{
            const [cartItems, setcartItems] = useState({})
            const url = "https://foody-application-backend.onrender.com"
            const [token, settoken] = useState("")
            const [food_list, setfood_list] = useState([])

            const addToCart = async(itemId)=>{
                    if(!cartItems[itemId]){
                        setcartItems((prev)=>({...prev,[itemId]:1}))
                    }
                    else{
                        setcartItems((prev)=>({...prev,[itemId]:(prev[itemId]||0) +1 }))
                    }
                    if(token){
                        await axios.post(url+"/api/cart/add" ,{itemId} ,{headers:{token}})
                    }
            }
            const removeFromCart = async(itemId)=>{
                setcartItems((prev)=>({...prev,[itemId]: prev[itemId]-1 }))
                if(token){
                    await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})   
                }
            }

          
            const getTotalCartAmount = ()=>{
                let totalAmount = 0 ;
                for(const item in cartItems){
                    if(cartItems[item] >  0){
                        let itemInfo  = food_list.find((product)=>product._id ===item);
                        totalAmount += itemInfo.price * cartItems[item]
                    }
                }
                return totalAmount
            }
                
            const fetchFoodList = async()=>{
                const response = await axios.get(url+"/api/food/list")
                setfood_list(response.data.data)
            }
            const loadCartData =async (token)=>{
             const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
             setcartItems(response.data.cartData)
            }
            useEffect(() => {
                async function loadData(){
                    await fetchFoodList();
                    if(localStorage.getItem("token")){
                        settoken(localStorage.getItem("token"))
                       await  loadCartData(localStorage.getItem("token"))
                    }
                }
                loadData()
            }, [])
            
        const contextValue = {
            food_list,
            addToCart,
            removeFromCart,
            cartItems,
            setcartItems,
            getTotalCartAmount,
            url,
            token,
            settoken
        }
        return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
         </StoreContext.Provider>
        )
        
}
export default StoreContextProvider
