
import {models , Schema, model} from 'mongoose'

const orderSchema = new Schema({
    userEmail : String,
    phoneNumber: String,
    streetAddress: String,
    pincode: String,
    city: String,
    country: String,
    cartProducts: Object,
    paid: {type: Boolean , default:false}
}, {timestamps: true})

export const Order = models?.Order || model('Order' , orderSchema);