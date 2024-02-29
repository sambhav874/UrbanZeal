// models/CarouselImage.js

import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: false, // Change to false to make it optional
  },
});

const menImageSchema = new mongoose.Schema({
  menImageUrl: {
    type: String,
    required: false, // Change to false to make it optional
  },
});

const womenImageSchema = new mongoose.Schema({
  womenImageUrl: {
    type: String,
    required: false, // Change to false to make it optional
  },
});

const kidsImageSchema = new mongoose.Schema({
  kidsImageUrl: {
    type: String,
    required: false, // Change to false to make it optional
  },
});

export const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);
export const MenImage = mongoose.models.MenImage || mongoose.model('MenImage', menImageSchema);
export const WomenImage = mongoose.models.WomenImage || mongoose.model('WomenImage', womenImageSchema);
export const KidsImage = mongoose.models.KidsImage || mongoose.model('KidsImage', kidsImageSchema);
