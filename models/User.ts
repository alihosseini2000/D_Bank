import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  name: String,
  email: String,
  settings: { theme: { type: String, default: 'dark' } },
  history: [{ action: String, amount: Number, timestamp: Date }],
});

export default mongoose.models.User || mongoose.model('User', userSchema);