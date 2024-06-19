import mongoose from 'mongoose';

import { getServerSession } from "next-auth";
import { Order } from "./../../../models/Order";
import {isAdmin } from "./../auth/[...nextauth]/utils/isAdmin";
import { authOptions } from '../auth/[...nextauth]/auth';
import { UserInfo } from './../../../models/UserInfo';

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URI);

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const admin = await isAdmin();

    const url = new URL(req.url);


    const _id = url.searchParams.get('_id');
    
  if (_id) {
    return Response.json( await Order.findById(_id) );
  }

    if (admin) {
        return Response.json( await Order.find() );
    }
    
    if (userEmail) {
        return Response.json( await Order.find({userEmail}) );
    }


}
