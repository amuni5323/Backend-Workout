import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Login request received for:", email);
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    console.log(user)

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // // res.status(200).json({ token, user });
    // res.json({
    //     token,
    //     user: {
    //       _id: user._id,
    //       email: user.email,
    //       username: user.name, 
    //     },
    //   });
    res.status(200).json({ message: 'Login successful', token, 

      user: {
        _id: user._id,
        email: user.email,
        username: user.username,  // If 'name' is used in the User model, change to 'name'
      },
     });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getUserWeight = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ weight: user.weight });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};