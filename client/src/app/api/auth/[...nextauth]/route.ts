import NextAuth from "next-auth/next";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

console.log("IN ROUTE");

export { handler as GET, handler as POST };
