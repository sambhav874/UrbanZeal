import { isAdmin } from "../auth/[...nextauth]/route";
import { Image, MenImage, WomenImage, KidsImage } from "./../../../models/CarouselImage";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI);

export async function POST(req, res) {
  try {
    const { imageUrl, menImageUrl, womenImageUrl, kidsImageUrl } = await req.json();
    console.log(imageUrl, menImageUrl, womenImageUrl, kidsImageUrl)
    if (await isAdmin()) {
      const createdDocs = [];
      // Create documents only if the URLs are provided
      if (imageUrl) {
        const imageDoc = await Image.create({ imageUrl });
        createdDocs.push(imageDoc);
      }

      if (menImageUrl) {
        const menImageDoc = await MenImage.create({ menImageUrl });
        createdDocs.push(menImageDoc);
      }

      if (womenImageUrl) {
        const womenImageDoc = await WomenImage.create({ womenImageUrl });
        createdDocs.push(womenImageDoc);
      }

      if (kidsImageUrl) {
        const kidsImageDoc = await KidsImage.create({ kidsImageUrl });
        createdDocs.push(kidsImageDoc);
      }
      
      return Response.json({ createdDocs });
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
