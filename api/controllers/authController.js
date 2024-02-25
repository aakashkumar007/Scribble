import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userSchema from "../model/user.model.js";
import jwt  from "jsonwebtoken";
export const registerController = async(req,res) => {
    try {
        const {name,email,password,phone,address} = req.body;

        //validation
         if (!name || !email || !password || !phone ||!address ) {
            return  res.status(400).json("Please provide name and an email and password and phone number and address");
        }
        //check existing user
        const user = await userSchema.findOne({ email });
        if (user) return res.status(400).json('User already registered');

        //create new user
        const hashedPassword= await hashPassword(password)
        //save
        const  newUser = new userSchema({ name, email, password:hashedPassword , phone, address});
        await newUser.save();
        res.status(201).send("User created successfully");
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message: 'Server error',error});
        
    }


};

export const loginController =  async(req,res)=>{
    try {
        const { email, password } = req.body;
      //validation
      if(!email || !password){
        return res.status(404).send('Please provide an valid email and a password')
      } 

      const user = await userSchema.findOne( { email } );
      if (!user) return res.status(404).json('Invalid Email');

      const match = await comparePassword(password,user.password)
      
      if (!match) return res.status(200).json('Invalid Password)');

      //jwt token
      const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"3h"})
      res.status(200).send({
        success:true,
        message:'Login  Successful!',
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
          },
        token
      })
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false,message:"Error in login",
        error
    })
}
}

export const testController = (req,res)=>{
    res.send("protected route");
}

