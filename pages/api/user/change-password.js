import { getSession } from 'next-auth/react';
import connectDB from '../../../helpers/db';
import hashPassword from '../../../helpers/hashPassword';
import User1 from '../../../helpers/User1';
import { verifyPassword } from '../auth/[...nextauth]';

const handler = async (req, res) => {
  // if (req.method !== 'PATCH') {
  //   return;
  // }

  // const session = await getSession({ req: req });
  // if (!session) {
  //   res.status(401).json({ message: 'Not authenticated' });
  //   return;
  // }

  // const userEmail = session.user.email;
  // const oldPassword = req.body.oldPassword;
  // const newPassword = req.body.newPassword;

  // await connectDB();
  // const user = await User1.findOne({ email: userEmail });
  // if (!user) {
  //   res.status(404).json({ message: 'User not found' });
  //   return;
  // }

  // const currentPassword = user.password;
  // const isValid = await verifyPassword(oldPassword, currentPassword);
  // if (!isValid) {
  //   res.status(403).json({ message: 'In correct old password' });
  //   return;
  // }

  // const hashedPassword = await hashPassword(newPassword);

  // const result = User1.updateOne(
  //   { email: user.email },
  //   { $set: { password: hashedPassword } }
  // );
  // res.status(200).json({ message: 'reset password successfully' });
  // return result;

  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  await connectDB();
  const user = await User1.findOne({ email: session.user.email });

  if (!user) {
    res.status(403).json({ message: 'No user found' });
    return;
  }

  const currentPassword = user.password;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const isValid = await verifyPassword(oldPassword, currentPassword);
  if (!isValid) {
    res.status(401).json({ message: 'incorrect old password' });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  const result = await User1.updateOne(
    { email: session.user.email },
    { $set: { password: hashedPassword } }
  );
  res.status(200).json({ message: 'update successful' });
  return result;
};

export default handler;
