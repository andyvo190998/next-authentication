import mongoose from 'mongoose';

const connectDB = async () => {
  const URL = process.env.MONGODB_URI;

  const client = await mongoose.connect(URL);

  return client;
};

export default connectDB;
