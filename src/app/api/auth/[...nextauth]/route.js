import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database";
import User from "@models/user";

// Define the authentication handler
const handler = NextAuth({
    providers: [
        GoogleProvider({
            // Configure Google provider with client ID and client secret
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {

            // Function to manipulate the session object before it's returned
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                // Check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });

                // If not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        image: profile.picture, 
                        username: profile.name.replace(" ", "").toLowerCase(),
                    })
                }

                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        }

    }
})

// Export the authentication handler for both GET and POST requests
export { handler as GET, handler as POST };
