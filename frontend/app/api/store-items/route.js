// storeItems.js (API route)
import mongoose from "mongoose";
import { StoreItems } from "../../../models/StoreItems";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URI);
    const data = await req.json();
    const storeItemsDoc = await StoreItems.create(data);
    console.log(data);
    return Response.json(storeItemsDoc);
}
