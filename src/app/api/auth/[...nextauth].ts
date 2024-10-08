import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// Extend the JWT and Session interfaces to include access_token
declare module "next-auth" {
  interface Session {
    accessToken: string;
  }

  interface User {
    access_token: string;
  }
}

declare module "next-auth" {
  interface JWT {
    accessToken: string;
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Call the backend login API

          const res = await axios.post(
            "http://www.localhost:4000/api/auth/login",
            {
              username: credentials?.username,
              password: credentials?.password,
            },
          );
          const user = res.data;

          if (user) {
            return user; // Ensure the returned user includes access_token
          }
          return null;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Redirect to login page if not authenticated
    signOut: "/auth/logout",
    error: "/auth/error", // Error page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token; // Store the access token in the JWT
      }
      return token;
    },
    async session({ session, token }) {
      // Explicitly cast token.accessToken to string
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret: process.env.JWT_SECRET, // Ensure you have JWT_SECRET in .env
});
