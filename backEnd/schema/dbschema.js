
const { ObjectID } = require('bson');
let mongoose = require('mongoose')
const validate = require('validator')
const { userPost } = require('../controls/user_routerfunction')

let Schema = mongoose.Schema;
ObjectId = Schema.ObjectId

let userDataSchema = new Schema({
    userName:{
        type:String,
        required:true,
        minlength:3
    },

    email:{
        type:String,
        unique:[true,"Email already Exist"]
    },
    phone:{
        type:Number
    },
    password:{
        type:String,
    }
   
})

let userPostSchema = new Schema({
    userID:ObjectId,
    caption:String,
    image:String,
    date_time:{type:Date,default:Date.now()},
    count:[]
    
})

let userCommentSchema = new Schema({
    userID:ObjectId,
    userName:String,
    postID:ObjectID,
    comment:String
})

let userLike = new Schema({
    userID:ObjectId,
    status:Boolean,
    postID:ObjectId,
})

let contests = new Schema({
    userId:ObjectId,
    contestName:String,
    sponserName:String,
    rulesInstrutions:String,
    firstPrice:String,
    secondPrice:String,
    thirdPrice:String,
    date:String

})
//user data
const userModel = mongoose.model('userdata',userDataSchema);

//user post
const userPostModel=mongoose.model('userPost',userPostSchema)

//comments
const userComments = mongoose.model('userComment',userCommentSchema)

//likes
const userLikes = mongoose.model('userlike',userLike)

//contest
const userContest = mongoose.model('contest',contests)

module.exports={
    userModel,
    userPostModel,
    userComments,
    userLikes,
    userContest
}