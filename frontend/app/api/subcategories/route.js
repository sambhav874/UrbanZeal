import {isAdmin} from "./../../api/auth/[...nextauth]/route";
import { Subcategory } from './../../../models/SubCategory';
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URI);
  const { name , parentCategory , image } = await req.json();
  if (await isAdmin()) {
    const subcategoryDoc = await Subcategory.create({ name , parentCategory , image });
    
    return Response.json(subcategoryDoc);
  } else {
    return Response.json({});
  }
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URI);
    const {_id, name , parentCategory} = await req.json();
    if (await isAdmin()) {
      
      await Subcategory.updateOne({_id}, {name , parentCategory , image});
    }
    return Response.json(true);
  }
  

export async function GET() {
  mongoose.connect(process.env.MONGO_URI);
  return Response.json(
    await Subcategory.find()
  );
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URI);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (await isAdmin()) {
    await Subcategory.deleteOne({ _id });
  }
  return Response.json(true);
}
