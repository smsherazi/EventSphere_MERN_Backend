   import jwt from 'jsonwebtoken';
   import dotenv from 'dotenv';
   dotenv.config();


   const secretKey = process.env.SECRET_KEY;

   export const tokenGenrate = async (u_id,u_role)=>{
      return jwt.sign({
         id: u_id,
         role: u_role
      }, secretKey,{expiresIn: '1d'})
   }

   export const tokenDecoder = async (token,key) => {
      return jwt.decode(token, key);
   }

   