
import {models , model , Schema } from 'mongoose'

const subcategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    parentCategory: { type: String , required: true },
    image: {type: String , required: true}
    
  }, { timestamps: true });
  
  export const Subcategory = models?.Subcategory || model('Subcategory', subcategorySchema);
  

