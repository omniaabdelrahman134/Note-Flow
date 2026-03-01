import { jwtDecode } from 'jwt-decode';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: { signIn: '/login' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        const res = await fetch(
          'https://note-sigma-black.vercel.app/api/v1/users/signIn',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          },
        );
        const data: { msg: string; token: string } = await res.json();
        console.log(data);

        if (data.msg === 'done') {
          const decoded: { id: string } = jwtDecode(data.token);
          console.log('decoded: ', decoded);
          return {
            token: data.token,
            id: decoded.id,
          };
        } else {
          throw new Error(data.msg);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
};
