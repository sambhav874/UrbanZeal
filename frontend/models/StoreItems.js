import {Schema , model , models} from 'mongoose';

const storeItemsSchema = new Schema({
    image : { type : String},
    name: {type : String},
    description: {type : String},
    price: {type : Number},
    category: { type : String}, 
}, {timestamps : true})

export const StoreItems = models?.StoreItems || model('StoreItems' , storeItemsSchema);