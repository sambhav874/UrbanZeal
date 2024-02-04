import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials"
import * as mongoose from 'mongoose'
import {User} from '../../../../models/User'
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../libs/mongoConnect"

export const authOptions ={
  
  secret : process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
    
providers: [

  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET
  }),


  CredentialsProvider({
    name: 'Credentials',
    id: 'credentials',
    credentials: {
      username: { label: "Email", type: "email", placeholder: "test@example.com" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {

        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({email});
        const passwordOK = user && (password === user.password);
        
        

        if(passwordOK){
          
            return user;
        }
      
      return null
    }
  })
]

}

const handler = NextAuth(authOptions);

export {handler as GET , handler as POST }