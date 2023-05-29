import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Make a request to your authentication endpoint with the provided credentials
        const response = await axios.post("http://localhost:8090/api/v1/auth/authentication", {
          email,
          password
        });

        const { user } = response.data;

        if (user) {
          // Extract the additional data you want to save
          const { email, firstname, role, ...additionalFields } = user;

          // Return an object containing the user properties you want to save
          return {
            email,
            name: firstname,
            role,
            ...additionalFields
          };
        } else {
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXT_PUBLIC_SECRET
});