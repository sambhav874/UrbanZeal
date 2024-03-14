import mongoose from "mongoose"
import { getServerSession } from "next-auth";
import { Order } from "../../../models/Order";
import StoreItem from "../../../components/store/StoreItem";
const stripe = require('stripe')(process.env.STRIPE_SK)

export async function POST(){
    mongoose.connect(process.env.MONGO_URI);

    const {cartProducts , address} = await req.json();

   

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDoc = await Order.create({
        userEmail,
        ...address,
        cartProducts,
        paid: false
    })

    const stripeLineItems = [];
    for (const cartProduct of cartProducts){
        const productName = product.name;
        const productInfo = await StoreItem.findById(cartProduct._id);
        const productPrice =  cartProduct.price;
        
        if(cartProduct.size){
           const size =  productInfo.sizes.find(size =>size._id.toString() === cartProduct._id.toString());
           productPrice += size.price;
        }
        stripeLineItems.push({
            quantity: 1 ,
            price_data: {
                currency:'INR',
                price_data: {
                    name: productName
                },
                unit_amount : productPrice * 100
            }
        })
    }

    console.log({stripeLineItems});
    return Response.json(null);


    const stripeSession = await stripe.session.create({
        line_items: [],
          mode: 'payment',
          customer_email: userEmail,
          success_url: process.env.NEXTAUTH_URL + 'cart?success=1',
          cancel_url: process.env.NEXTAUTH_URL + 'cart?cancelled=1',
          metadata: {orderId : orderDoc._id},
          shipping_options: [
              {
                  shipping_rate_data: {
                      display_name: 'Delivery Fee',
                      type: 'fixed_amount',
                      fixed_amount: {amount: 500 , currency:'INR'},
                  }
              }
          ]
       })
}

