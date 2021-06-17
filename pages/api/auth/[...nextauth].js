import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import dbConnect from "../../../src/utils/dbConnect";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if(!user) {
          client.close();
          throw new Error("User not found!")
        }

        const isValid = await user.verifyPassword(credentials.password, user.password);

        if(!isValid) {
          client.close();
          new Error("Could not log you in!")
        }

        client.close()
        return { email: user.email };
      }
    })
  ]
})