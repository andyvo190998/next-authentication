import mongoose from 'mongoose';

const userSchema = {
  email: String,
  password: String,
};

export default mongoose.models.User1 || mongoose.model('User1', userSchema);
