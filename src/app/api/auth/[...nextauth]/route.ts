import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Local validation to prevent unnecessary fetch
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          const res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          // 2. Check if DummyJSON returned an error
          if (!res.ok) {
            return null; 
          }

          const user = await res.json();

          // 3. Ensure the object returned is serializable
          if (user && user.token) {
            return {
              id: user.id,
              name: user.firstName,
              email: user.email,
              image: user.image,
              token: user.token, // This is your token for Zustand later
            };
          }
          
          return null;
        } catch (error) {
          console.error("Auth Fetch Error:", error);
          return null;
        }
      },
    }),
  ],
  // 4. Force JWT strategy for easier state management with Zustand
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };