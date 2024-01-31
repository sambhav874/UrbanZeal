import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials"
import * as mongoose from 'mongoose'
import {User} from '../../../../models/User'
import bcrypt from 'bcrypt';

const handler = NextAuth({
    secret : process.env.SECRET,
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    id: 'credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Email", type: "email", placeholder: "test@example.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        mongoose.connect(process.env.MONGO_URI);
        const user =await User.find({email});
        const passwordOK = user && bcrypt.compareSync(password , user.password);
        
        if(passwordOK){
            return user;
        }
      console.log({credentials});
      return null
    }
  })
]

})

export {handler as GET , handler as POST }