import { model , models , Schema} from "mongoose";

const userSchema = new Schema({
    name: {type: String , required: true},
    email: {type : String , required : true , unique : true},
    phoneNumber: {type:String , required : true},
    streetAddress : {type:String},
    city :{ type : String },
    country:{type : String},
    postalCode:{type : String},
    
    password: {type : String , required : true , validate :pass=> {
        if(!pass?.length || pass.length < 5){
            new Error("Password must atleast have 5 characters.")
        }
        
    }}, image: {type: String},
}, {timestamps : true});



export const User = models?.User || model('User' , userSchema);