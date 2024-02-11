import { model , models , Schema} from "mongoose";

const userInfoSchema = new Schema({
    
    email: {type : String , required : true , unique : true},
    streetAddress : {type:String},
    phoneNumber: {type:String , required : true},
    city :{ type : String },
    country:{type : String},
    pincode:{type : String},
    admin:{type : Boolean , default : false},
    
}, {timestamps : true});



export const UserInfo = models?.UserInfo || model('UserInfo' , userInfoSchema);