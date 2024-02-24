import mongoose from 'mongoose';
import {User} from './../../../models/User'

export async function GET(){
    mongoose.connect(process.env.MONGO_URI);
    return Response.json(
        await User.find()
    )
}