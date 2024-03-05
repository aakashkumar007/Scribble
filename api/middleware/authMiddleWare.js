import jwt from 'jsonwebtoken';
import userSchema from '../model/user.model.js';

export const requireSignIn = async(req,res,next)=>{
    try {
        console.log(req.headers);
        const decode = jwt.verify(req.headers.authorization,process.env.JWT_SECRET);  // verify
        req.user =decode;
         next();
    
    } catch (error) {
        console.log(error);
    }
}

//admin access
export const isAdmin =async(req,res,next)=>{
    try {
        const user = await userSchema.findById(req.user._id);
        if(user.role!== 1){
            return res.status(401).send({
                success:false,
                error:"You are not admin"
            })
        }else{
          next(); 
        }
    } catch (error) {
        console.log(error);
    }
}