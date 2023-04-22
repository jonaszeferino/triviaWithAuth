import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "me@email.com",
        },
        password: { label: "Password", type: "password}" },
      },
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        //logica do login
        // procurar o usuário no banco de dados
        if (email !== "john@gmail.com" && password !== "1234") {
          throw new Error("Invalid Credentials");
        }
        return { id: "1234", name: "John Doe", email: "john@gmail.com" };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // error: "/auth/signin",
    // signOut: "/auth/signin",
  },
};

export default NextAuth(authOptions);
