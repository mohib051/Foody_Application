import mongoose from 'mongoose';

 export const connectToDb = async()=>{
    await mongoose.connect("mongodb+srv://kazimohib51:kazimohib51@cluster0.tun3n.mongodb.net/foody")
    .then(()=>{
        console.log("connected to db")
    })
    .catch((error)=>{
            console.log(error)
    })
}