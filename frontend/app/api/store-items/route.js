// storeItems.js (API route)
import mongoose from "mongoose";
import { StoreItems } from "../../../models/StoreItems";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URI);
    const data = await req.json();
    const storeItemsDoc = await StoreItems.create(data);
    console.log(storeItemsDoc);
    console.log(data);
    
    return Response.json(storeItemsDoc);
}

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URI);
    const {_id , ...data} = await req.json();
    await StoreItems.findByIdAndUpdate(_id , data);
    return Response.json(true);


}

export async function GET(){
    mongoose.connect(process.env.MONGO_URI);
    return Response.json(
        await StoreItems.find()
    )
}

export async  function DELETE(req){
    mongoose.connect(process.env.MONGO_URI)
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id')
    await StoreItems.deleteOne({_id});
    return Response.json(true);
}