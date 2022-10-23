import { Types } from 'mongoose'

 export interface userInfo{
      _id?:Types.ObjectId;
      userName?:string;
      email?:string;
      phone?:number;
      password?:string|number;
      exist?:boolean;
      __v?:number;
}

export interface token{
  token?:string;
  user?:string;
  exist?:boolean;
  pass?:boolean
}

export interface userCheck{
  prevent?:boolean;
}

export interface post{
  caption?:string;
  file?:File;
}

export interface comments{
  _id?:Types.ObjectId|string|undefined;
  postID?:Types.ObjectId;
  userName?:string|null;
  comment?:string;
  name?:string|null
}

export interface userPost{
  _id:Types.ObjectId;
  userID?:string;
  caption?:string;
  img?:string[];
  name:userInfo;
  item?:boolean;
  comments?:comments[];
  count?:any[];
  fav?:number;
  liked?:boolean;
  currUser?:any;
}

export interface image{
  lastModified?:number;
  lastModifiedDate?:string;
  name?:string;
  size?:number;
  type?:string;
  webkitRelativePath?:string;
}

export interface userImage{
  caption?:string;
  date_time?:string;
  userID?:string;
  image?:string;
  _id?:string;
  __V?:number;
}

export interface userProfileImage{
  data:userImage[];
  details:userInfo;
}

export interface contests{
  _id?:string;
  userId?:Types.ObjectId
  contestName?:string;
  sponserName?:string;
  rulesInstrutions?:string;
  firstPrice?:string;
  secondPrice?:string;
  thirdPrice?:string;
  date?:string
}
