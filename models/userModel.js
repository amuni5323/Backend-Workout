import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true, // Ensures no two users can have the same username
      },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  weight: { type: Number },
  
});

// Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const User = mongoose.model('User', userSchema);

export default User;
