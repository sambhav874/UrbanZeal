
import {models , model , Schema } from 'mongoose'

const subcategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    
  }, { timestamps: true });
  
  export const Subcategory = models?.Subcategory || model('Subcategory', subcategorySchema);
  

