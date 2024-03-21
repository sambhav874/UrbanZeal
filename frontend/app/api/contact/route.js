import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { Queries } from "../../../models/Query";

export async function POST(req) {
    const { email, query } = await req.json();
    console.log(email, query);

    mongoose.connect(process.env.MONGO_URI);

    try {
        // Create a nodemailer transporter using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.net',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            debug: true,
        })

        // Define email options
        const mailOptions = {
            from: "sambhavjain874@gmail.com",
            to: email,
            subject: "Thanks for your query .",
            text: 
            `Dear \n\nThank you for reaching out with your query. We have received your message and will get back to you as soon as possible.\n\nQuery details:\n${query}\n\nBest regards,\nUrbanZeal.`,
        };

        // Create query in MongoDB
        const newQuery = await Queries.create({ userEmail: email, query });

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        return Response.json(newQuery);
    } catch (error) {
        console.error("Error sending email:", error);
        return Response.json(error);
    }
}
