import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { Order } from "../../../models/Order";
import StoreItems from "../../../models/StoreItems";
import { authOptions } from "./../auth/[...nextauth]/route";
const stripe = require('stripe')(process.env.STRIPE_SK)

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URI);

    const { cartProducts, address } = await req.json();

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDoc = await Order.create({
        userEmail,
        ...address,
        cartProducts,
        paid: false
    })

    const stripeLineItems = [];
    console.log('Cart Products : '+cartProducts);
    for (const cartProduct of cartProducts) {
        try {
            const productInfo = await StoreItems.findById(cartProduct._id);
            if (!productInfo) {
                console.error(`Product with ID ${cartProduct._id} not found.`);
                // Consider returning an error response here
                continue; // Skip to the next iteration
            }
            let productPrice = cartProduct.price;
        
            if (cartProduct.size) {
                const size = productInfo.sizes
                  .find(size => size._id.toString() === cartProduct.size._id.toString());
                productPrice += size.price;
              }
        
            const productName = cartProduct.name; // Corrected property access

            stripeLineItems.push({
                quantity: 1,
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: productName
                    },
                    unit_amount: productPrice * 100
                }
            });
            console.log({ stripeLineItems });
        } catch (error) {
            console.error("Error fetching product info:", error);
            // Consider returning an error response here
        }
    }

    
    // Consider returning a more informative response

    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: userEmail,
        success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
        cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
        metadata: {orderId:orderDoc._id.toString()},
        payment_intent_data: {
          metadata:{orderId:orderDoc._id.toString()},
        },
        shipping_options: [
          {
            shipping_rate_data: {
              display_name: 'Delivery fee',
              type: 'fixed_amount',
              fixed_amount: {amount: 500, currency: 'USD'},
            },
          }
        ],
      });
  
}
