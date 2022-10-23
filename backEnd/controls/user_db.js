const user = require('../schema/dbschema')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const { userPost } = require('./user_routerfunction')
const ObjectId = require('mongodb').ObjectId

module.exports={
    register: (userInfo)=>{
        
        return new Promise(async(res,rej)=>{
            console.log(userInfo);
            const userExist=await user.userModel.findOne({email:userInfo.email});
            if(!userExist){
                userInfo.password = await bcrypt.hash(userInfo.password,10)
                data = new user.userModel(userInfo)
                data.save().then((response)=>{
                    res({exist:false})
                })
            }
            else{
               res({exist:true}) 
            }
           
        }).catch((e)=>{
            console.log("Error");
            console.log(e);
        })
    },

    googleLogindb:(data)=>{
        return new Promise(async(res,rej)=>{
            let userExist = await user.userModel.findOne({email:data.email})
            if(!userExist){
                let info = await user.userModel(data)
                info.save().then((response)=>{
                res(response)
            })
            }
            else{
                res(userExist)
            }
            
        })
    },

    loginAuthenticate:(userData)=>{
        return new Promise(async(res,rej)=>{
            let userInfoRes={
                Exist:true
            }
            let userExist = await user.userModel.findOne({email:userData.email})
            if(userExist){
                bcrypt.compare(userData.password,userExist.password).then((verify)=>{
                    if(verify){
                        console.log("login success");
                        userInfoRes.user=userExist;
                        userInfoRes.status=true;
                        res(userInfoRes)
                    }
                    else{
                        console.log("invalid password");
                        userInfoRes.status=false;
                        res(userInfoRes)
                    }
                }).catch((e)=>{
                    console.log(e);
                })
            }
            else{
                console.log("user not exist");
                userInfoRes.Exist=false;
                res(userInfoRes)
            }
        })
    },

    userPostdb:(caption,ID,imgName)=>{
        console.log(ID);
        return new Promise(async(res,rej)=>{
            let data = {
                userID:ObjectId(ID),
                caption:caption,
                image:imgName,
                count:[]
            }
            let userPos = new user.userPostModel(data)
            let pic=await userPos.save()
                res(pic._id)
           
        })
    },

    getPostdb:()=>{
        return new Promise(async(res,rej)=>{
            let data = await user.userPostModel.aggregate([
                {
                    $project:{
                        _id:1,
                        userID:1,
                        caption:1,
                   
                    }
                },
                {
                    $lookup:{
                        from:'userdatas',
                        localField: 'userID' ,
                        foreignField: '_id',
                        as: 'name'
                    }
                },
                {
                    $lookup:
                        {
                            from: 'usercomments',
                            localField: '_id',
                            foreignField: 'postID',
                            as: 'comments'
                          }
                    
                },
                {
                    $lookup:{
                        from:'userlikes',
                        localField:'_id',
                        foreignField:'postID',
                        as:'count'
                    }
                },
                {
                    $project:{
                        _id:1,
                        userID:1,
                        caption:1,
                        name:{$arrayElemAt:['$name',0]},
                        comments:1,
                        count:1
                    }
                },
                {
                    $sort:{
                        _id:-1
                    }
                }
            ])
            if(data){
                for(let i in data){
                    data[i].item=true;
                }
                res(data);
            }
        })
    },

    getProPicsdb:(id)=>{
        return new Promise((res,rej)=>{
            user.userPostModel.find({userID:id}).then((data)=>{
                if(data){
                    console.log(data);
                    res(data)
                }
            })
        })
    },

    usersPostIDdb:(id)=>{
        return new Promise(async(res,rej)=>{
            let data = await user.userPostModel.find({userID:id})
            console.log(data);
            if(data){
                res(data)
            }
        })
    },

    getuserDetials:(id)=>{
        return new Promise(async(res,rej)=>{
            let details= await user.userModel.findOne({_id:id})
            res(details)
        })
    },

    commentsdb:(data,name)=>{
        data.userName= name
        data.postID=ObjectId(data.id)
        console.log(data);
        let comments = user.userComments(data)
        comments.save().then((data)=>{
           
        })
    },

    editProfile:(editBody,ID)=>{
        return new Promise((res,rej)=>{
            let data = user.userModel.updateOne({_id:ID},{$set:{userName:editBody.name,email:editBody.email,phone:editBody.phone}})
            if(data){
                res(data)
            }
        })
    },

    createLikedb:(data)=>{
        return new Promise(async(res,rej)=>{
            
            let likedExist=await user.userLikes.aggregate([
                {
                    $match:{
                        userID:ObjectId(data.userID),
                        postID:ObjectId(data.postID)
                        
                    }
                }
            ])
            if(likedExist.length==0){
                console.log("liked");
            let like = user.userLikes(data);
                        like.save().then(()=>{
                            res() 
                        }) 
            }
            else{
            user.userLikes.updateOne({userID:data.userID,postID:data.postID},{$set:{status:data.status}}).then((data)=>{              
            res()
            }).catch((e)=>{
             console.log(e);
             })
            }  
        })
    },

    contestdb:(data)=>{
        return new Promise((res,rej)=>{
            let contest = user.userContest(data);
            contest.save().then(()=>{
                res()
            })
        })
    },

    getContestdb:()=>{
        return new Promise((res,rej)=>{
             user.userContest.find({}).then((data)=>{
                console.log(data);
                res(data)

            })
        })
    }



    


} 