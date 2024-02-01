import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials"
import * as mongoose from 'mongoose'
import {User} from '../../../../models/User'
import bcrypt from 'bcrypt';

const handler = NextAuth({
    secret : process.env.SECRET,
providers: [
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

})

export {handler as GET , handler as POST }