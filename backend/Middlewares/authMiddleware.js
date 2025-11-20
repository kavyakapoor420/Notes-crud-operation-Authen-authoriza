const jwt=require('jwt')

const protected=(req,res,next)=>{
    let token=req.header("Authorization")

    if(!token){
        return res.status(401).json({message:'no token authorization denied'})
    }

    try{
        // expecting formate "Bearere <Token>"

        if(token.startsWith("Bearer")){
            token=token.slice(7,token.length)
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        req.user=decoded.id ;

        next() 

    }catch(err){
        res.status(401).json({message:'token is not valid'})
    }
}

module.exports=protected