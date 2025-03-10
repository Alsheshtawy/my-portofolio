import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt"
import Joi from "joi";


const signUp = async(req,res)=>
    {
      try{
        let {error} = signUpValidationSchemac.validate(req.body,{abortEarly:false});
        console.log(error,"validation")
      let { email }= req.body;
      let foundedUser = await userModel.findOne({email:email});
      if(foundedUser){
        res.json({message:"already register"})
    
    }else{
        let hashPassword = bcrypt.hashSync(req.body.password,7)
        let addUser = await userModel.insertMany({...req.body,password:hashPassword})
        res.json({message:"add succesfully",addUser})
      }}catch(error){
        res.json({message:"error",error})
      }
    }

    const signIn = async (req,res) => {
    let foundedUser = await userModel.findOne({email:req.body.email});
    if(foundedUser){
      let matches = bcrypt.compareSync(req.body.password, foundedUser.password)
      if(foundedUser.password==req.body.password){
      
        res.json({message:"welcome"})
      }else{
        res.json({message:"password wrong"})
      }
    }else{
      res.json({merssage:"you have to register first"})
    }
  }


  export const addUser = async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    let user = new User(req.body)
    await user.save()
    res.json({ message: "User added successfully", user })

}
export const getAllUsers = async (req, res) => {
    let user = await userModel.find()
    res.json({ message: "all users", user })
}


export const updateUser = async (req, res) => {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ message: "updated successfully", user })
}


export const deleteUser = async (req, res) => {
    let user = await User.findByIdAndDelete(req.params.id)
    res.json({ message: "deleted successfully", user })
} 
export {signUp,getAllUsers,updateUser,deleteUser,addUser,signIn}