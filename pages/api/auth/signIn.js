import connectDB from '../../../helpers/db';
import hashPassword from '../../../helpers/hashPassword';
import User1 from '../../../helpers/User1';

const SignIn = async (req, res) => {
  if (req.method === 'POST') {
    await connectDB();
    const hashedPassword = await hashPassword(req.body.password);

    const newUser = await new User1({
      email: req.body.email,
      password: hashedPassword,
    });
    const existingUser = await User1.findOne({ email: req.body.email });
    if (existingUser) {
      console.log('user existing');
      return;
    }

    newUser
      .save()
      .then((item) => res.json(item))
      .catch(() => console.log('add failed'));
  }
};

export default SignIn;
