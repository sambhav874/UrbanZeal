import { Schema , model , models } from "mongoose";

const querySchema = new Schema({
    userEmail : String,
    query: String,
} , {timestamps: true})

export const Queries = models?.Queries || model('Queries' , querySchema);