import {Schema , model , models} from 'mongoose';

const extraPriceSchema = new Schema({
    name : String ,
    price :  Number 
})

const storeItemsSchema = new Schema({
    image : { type : String},
    name: { type : String},
    description: { type : String},
    price: { type : Number},
    category: { type : String}, 
    subcategory: { type : String},
    sizes : {type : [extraPriceSchema]}
}, {timestamps : true})

export const StoreItems = models?.StoreItems || model('StoreItems' , storeItemsSchema);