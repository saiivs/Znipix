let jwtDecode=require('jwt-decode');
module.exports={
    authenticate: (req,res,next)=>{
        let header = req.headers['authorise']
        if(header==null){
          console.log("error got");
          return res.sendStatus(401)
        }
        else{
          jwt.verify(header,process.env.secretKey,(err,user)=>{
            console.log(header);
            if(err){
              return res.sendStatus(403)
            } 
            req.user=user
            next() 
          })
        }
      },

      decodeToken:(req,res,next)=>{
        console.log("mid");
        let header = req.headers['authorise']
        if(header){
          let token = jwtDecode(header);
          let Id = token._id
          req.userId=Id
        }
        return next()
      }
}