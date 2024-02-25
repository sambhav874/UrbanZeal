import {authOptions} from './../auth/[...nextauth]/route'
import mongoose from "mongoose"
import { getServerSession } from "next-auth";
import {User} from "./../../../models/User";
import { UserInfo } from './../../../models/UserInfo';

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URI);
    
    const data = await req.json();
    const {_id , name , image ,...otherUserInfo} = data;
    
    let filter = {};
    if(_id){
        filter = {_id};
        
    }
    else{
        filter = {email};
        const session = await getServerSession(authOptions);
        const email = session.user.email;

        
    }

    console.log(filter)
    await User.updateOne(filter , {name , image});
 
    await UserInfo.findOneAndUpdate(filter ,otherUserInfo ,{upsert : true});
 

    return Response.json(true);
}

export async function GET(){
    mongoose.connect(process.env.MONGO_URI);
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if(!email){
        return Response.json({});
    }
    const user = await User.findOne({email}).lean();
    const userInfo = await UserInfo.findOne({email}).lean();
    return Response.json(
        {...user , ...userInfo}
    )
}