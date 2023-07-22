import NextAuth from "next-auth/next";

import { authOptions } from "@/lib/session";

const handler = NextAuth(authOptions);

// allow to make get and post requests
export { handler as GET, handler as POST };
