import mongoose from "mongoose"
const stripe = require('stripe')(process.env.STRIPE_SK)

export async function POST(){
    mongoose.connect(process.env.MONGO_URI);

    const {cartProducts , address} = await req.json();
}