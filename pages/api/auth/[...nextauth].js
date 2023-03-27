// import CredentialsProvider from 'next-auth/providers/credentials';
// import connectDB from '../../../helpers/db';
// import User1 from '../../../helpers/User1';
// import { compare } from 'bcryptjs';
// import NextAuth from 'next-auth';

// const verifyPassword = async (password, hashedPassword) => {
//   const isValid = await compare(password, hashedPassword);
//   return isValid;
// };

// export default NextAuth({
//   session: {
//     jwt: true,
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         await connectDB();
//         const user = await User1.findOne({ email: credentials.email });

//         if (!user) {
//           throw new Error('no user found');
//         }

//         const isValid = await verifyPassword(
//           credentials.password,
//           user.password
//         );

//         if (!isValid) {
//           throw new Error('incorrect password');
//         }
//         return { email: user.email };
//       },
//     }),
//   ],
// });

import { compare } from 'bcryptjs';
import NextAuth from 'next-auth/next';
import connectDB from '../../../helpers/db';
import User1 from '../../../helpers/User1';
import CredentialsProvider from 'next-auth/providers/credentials';

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectDB();
        const user = await User1.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('In valid Email');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Incorrect password');
        }
        return { email: user.email };
      },
    }),
  ],
});
