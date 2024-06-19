import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { Order } from "../../../models/Order";
import {StoreItems} from "../../../models/StoreItems";
import { authOptions } from "../auth/[...nextauth]/auth";

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
            
        } catch (error) {
            console.error("Error fetching product info:", error);
            // Consider returning an error response here
        }
    }

    
    // Consider returning a more informative response


      return Response.json(`orders/${orderDoc._id}`);
  
}
