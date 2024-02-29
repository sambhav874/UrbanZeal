import { isAdmin } from "../auth/[...nextauth]/route";
import { Image, MenImage, WomenImage, KidsImage } from "./../../../models/CarouselImage";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI);

export async function POST(req, res) {
  try {
    const { imageUrl, menImageUrl, womenImageUrl, kidsImageUrl } = req.body;
    console.log(imageUrl, menImageUrl, womenImageUrl, kidsImageUrl)
    if (await isAdmin()) {
      // Create documents only if the URLs are provided
      const imageDoc =  await Image.create({ imageUrl }) ;
      const menImageDoc =await MenImage.create({ menImageUrl });
      const womenImageDoc = await WomenImage.create({ womenImageUrl });
      const kidsImageDoc = await KidsImage.create({ kidsImageUrl });
      
      return Response.json({ imageDoc, menImageDoc, womenImageDoc, kidsImageDoc });
    } else {
      return Response.json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" });
  }
}

export async function GET(req, res) {
  try {
    const images = await Image.find();
    const menImages = await MenImage.find();
    const womenImages = await WomenImage.find();
    const kidsImages = await KidsImage.find();
    return Response.json({ images, menImages, womenImages, kidsImages });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" });
  }
}

export async function DELETE(req, res) {
  try {
    const { _id } = req.query;
    if (await isAdmin()) {
      // Delete documents for all image types
      await Image.deleteOne({ _id });
      await MenImage.deleteOne({ _id });
      await WomenImage.deleteOne({ _id });
      await KidsImage.deleteOne({ _id });
      return Response.json({ success: true });
    } else {
      return Response.json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" });
  }
}
