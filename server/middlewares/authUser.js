import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
     const {token} = req.cookies;
     
     if(!token){
        return res.json({ success: false, message: 'Token not found' });
      }
      
      
      try {
         const  tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        
         if(tokenDecode.id){
           
             if(!req.body) {
               req.body = {}
             }
            req.body.userId = tokenDecode.id;
            next();
         } else {
            return res.json({ success: false, message: ' Authorized' });
         }
         

         
     } catch (error) {
      
        return res.json({ success: false, message: 'Not Authorized' });
     }
}

export default authUser;