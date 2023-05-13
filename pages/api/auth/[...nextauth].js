import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { GOOGLE_LOGIN } from "../../../config";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: GOOGLE_LOGIN.client_id,
            clientSecret: GOOGLE_LOGIN.client_secret,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, profile }) {
          if (account.provider === "google") {
            return profile.email_verified && profile.email === GOOGLE_LOGIN.drive_owner;
          }
          return false // Do different verification for other providers that don't have `email_verified`
        },
      }
}

export default NextAuth(authOptions)