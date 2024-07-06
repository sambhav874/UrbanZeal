import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from "./../../../models/User";
import { UserInfo } from "./../../../models/UserInfo";
import { authOptions } from "../auth/[...nextauth]/auth";

mongoose.connect(process.env.MONGO_URI);

export async function PUT(req) {
  const data = await req.json();
  const { _id, name, image, ...otherUserInfo } = data;

  const session = await getServerSession(authOptions);
  const email = session.user.email;

  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    filter = { email };
  }

  const user = await User.findOne(filter); 
  await User.updateOne(filter, { name, image });

  await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true });

  return new Response(JSON.stringify(true), { status: 200 });
}

export async function GET(req) {
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  let filterUser = {};
  if (_id) {
    filterUser = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return new Response(JSON.stringify({}), { status: 200 });
    }
    filterUser = { email };
  }

  const user = await User.findOne(filterUser).lean();
  const userInfo = await UserInfo.findOne({ email: user.email }).lean();

  return new Response(JSON.stringify({ ...user, ...userInfo }), { status: 200 });
}
