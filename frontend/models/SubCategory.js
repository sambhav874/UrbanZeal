const subcategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    // Add other relevant fields: description, image, active flag, etc.
  }, { timestamps: true });
  
  export const Subcategory = model('Subcategory', subcategorySchema);
  