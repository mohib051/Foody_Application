import userModel from '../models/userModel.js'

//add to cart 
export const addToCart = async(req, res)=>{
        try {   
                let userData = await userModel.findOne({_id: req.body.userId})
                let cartData = await userData.cartData;
                
                if(!req.body.itemId){
                    return res.json({message:"Please add an item to cart "})
                }
                if(!cartData[req.body.itemId]){
                    cartData[req.body.itemId] =1 
                }
                else{
                    cartData[req.body.itemId] +=1
                }
                await userModel.findByIdAndUpdate(req.body.userId, {cartData});
                res.json({success:true, message: "Added to Cart"});
        } catch (error) {
            console.log(error)
            res.json({success:false , message:"Error"})
        }
}
//remove from cart
export const removeFromCart = async(req , res)=>{
        try {
                let userData = await userModel.findById(req.body.userId)
                let cartData = await userData.cartData;
                if(cartData[req.body.itemId] > 0 ){
                    cartData[req.body.itemId] -=1;
                }
                await userModel.findByIdAndUpdate(req.body.userId ,{cartData})
                res.json({success:true , message:"Removed from Cart"})
            } catch (error) {
                    console.log(error)
                    res.json({success:false , message:"Error"})
            }
}

//fetch user cart data
export const getCart = async(req ,res)=>{
        try {
            let userData = await userModel.findById(req.body.userId)
            let cartData = await userData.cartData;
            res.json({success:true , cartData})   
        } catch (error) {
            console.log(error)
            res.json({success:false,message:"Error" })
        }
}