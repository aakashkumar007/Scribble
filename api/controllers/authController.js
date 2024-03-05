import userSchema from "../model/user.model.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    //check user
    const exisitingUser = await userSchema.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userSchema({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    console.log("User registered successfully");

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error,"This is error in registration");
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        adddress: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//Forgot Password controller
export const forgotPasswordController = async(req,res)=>{
  try {
    const {email,answer,newPassword} =req.body;
    if(!email  || !answer || !newPassword){
      return res.status(400).send({message: 'Please provide all fields'})
    }

    //check
    const user = await userSchema.findOne({email,answer})

    //validation
    if (!user) {
      return res.status(404).send({
        success:false,
        message:"Wrong Email Or Answer"
      })
    }
    const hashed = hashPassword(newPassword)
    await userSchema.findByIdAndUpdate(user._id ,{password :hashed});
    
    res.status(201).json({
      success: true,
      data:{
        _id:user._id,
        email:user.email,
        message:'Password has been changed successfully',
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Server Error",
      error
    })
  }

}

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};