import jwt from 'jsonwebtoken';
import userSchema from '../model/user.model.js';

export const requireSignIn = async(req,res,next)=>{

    try {
        
        const decode = jwt.verify(req.headers.authorization,process.env.JWT_SECRET);  // verify
        req.user =decode;
        console.log("middleware checked");
         next();
    
    } catch (error) {
        console.log(error);
    }
}

//admin access
export const isAdmin =async(req,res,next)=>{
    try {
        console.log("Reached to  IsAdmin");
        const user = await userSchema.findById(req.user._id);
        if(user.role!= 1){
            return res.status(401).send({
                success:false,
                message:"login un-successful",
                error:"You are not admin"

            })
        }else{
          next();
          console.log("admin checked");
          
        }
    } catch (error) {
        console.log(error);
       
    }
}