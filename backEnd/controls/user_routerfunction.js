const userHelper = require('./user_db');
const jwt= require('jsonwebtoken');
require('dotenv').config();
let jwtDecode=require('jwt-decode');


module.exports={
    registerRoute: (req, res)=> {
        let data=req.body
        userHelper.register(data).then((userData)=>{
          if(userData.exist){
            res.json({exist:true})
          }
          else{
             res.json({exist:false})
          }
         
        }) 
      },

      google:(req,res)=>{
        let data=req.body;
        userHelper.googleLogindb(data).then(async(response)=>{
          if(response){
            console.log(response);
            let userData = JSON.stringify(response)
            let name=response.userName
            console.log(name);
           
            let accessToken = await jwt.sign(userData,process.env.secretKey)
            console.log(accessToken);
            res.json({token:accessToken,user:name,userId:response._id})
          }
        })
      },

    loginRoute: (req,res)=>{
        let userData=req.body
        userHelper.loginAuthenticate(userData).then(async(userInfoRes)=>{
          if(userInfoRes.Exist){
            if(userInfoRes.status){ 
              let user=userInfoRes.user;
              userJson=JSON.stringify(user)
              console.log(userJson);
             let accessToken=await jwt.sign(userJson,process.env.secretKey)
             res.json({token:accessToken,user:user.userName,userId:user._id,exist:true,pass:true})
            }
            else{
              res.json({exist:true,pass:false})
            }
          }
          else{
             res.json({exist:false}) 
          }
        })
      },

    checkToken: (req,res)=>{
      let header = req.headers['authorise'];
      
      if(header==null){
        return res.json({prevent:false})
      }
      else{
        jwt.verify(header,process.env.secretKey,(err,user)=>{
          if(err){  
            return res.json({prevent:false})
          }
          return res.json({prevent:true})
        })
      }

    },

    userPostR: async(req,res)=>{
      try{
      let caption=req.body.cap;
      let token=req.headers['authorise'];
      let decode=jwtDecode(token);
      let ID=decode._id;
      let image=req.files.image;
      let imgName=image.name;
      let response= await userHelper.userPostdb(caption,ID,imgName)
      let postId=response
      let allPostId= await userHelper.usersPostIDdb(ID)
      if(response){
      image.mv('./public/images/'+postId+'.jpg',(err,data)=>{
        if(!err){
          console.log('uploaded successfully');
          res.json(allPostId)
        }
        else{
          console.log(err);
        }
      })
      } 
      }
      catch(err){  
        console.log(err);
      }
    },

    getPost:(req,res)=>{
      userHelper.getPostdb().then((data)=>{
        res.json(data)
      })
    },

    getProPics:async(req,res)=>{
      let token=req.headers['authorise'];
      let decode=jwtDecode(token);
      let ID=decode._id;
      let details=await userHelper.getuserDetials(ID)
      userHelper.getProPicsdb(ID).then((data)=>{
        console.log("end");
        console.log(details);
          res.json({data,details})
      })
    },

    saveComments:async(req,res)=>{
      console.log("server reached");
      let token=req.headers['authorise'];
      let decode=jwtDecode(token);
      let ID=decode._id;
      console.log(decode);
      let name=decode.userName
      userHelper.commentsdb(req.body,name)
    },

    getComments:async(req,res)=>{
      let comments=await userHelper.getComments()
      res.json(comments)
    },

    editProfile:async(req,res)=>{
      console.log("edit reached");
      let token=req.headers['authorise'];
      let decode=jwtDecode(token);
      let ID=decode._id;
      console.log(req.body);
      let image = req.files.image
      let editDone = await userHelper.editProfile(req.body,ID)
      if(req.files.image){
        image.mv('./public/images/userProfile/'+ID+'.jpg',(err,data)=>{
          if(!err){
            console.log('Profile uploaded');
          }
          else{
            console.log(err);
          }
        })
      }
      if(editDone){
        res.json({status:true});
      }
    },

    createLike:(req,res)=>{
      let data = req.body;
      let token=req.headers['authorise'];
      let decode=jwtDecode(token);
      data.userID=decode._id;
      console.log(data);
        userHelper.createLikedb(data).then(()=>{
          res.status(200).json({status:"Success"})
        })
    },

    createContest:(req,res)=>{
      let data = req.body;
      data.userId=req.userId
      console.log(data);
      userHelper.contestdb(data).then(()=>{
        res.status(200).json({status:"contest created"})
       })
    },

    getContest:async(req,res)=>{
      let data = await userHelper.getContestdb()
      res.status(200).json(data)
    },

    getSingleContest:(req,res)=>{
      
    }

}