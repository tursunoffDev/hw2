import asyncHandler from 'express-async-handler';
import User from '../models/userModal.js';
import generateToken from '../utils/generateToken.js';

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      message: 'Success',
      jwt_token: generateToken(user._id),
    });

    req.headers.authorization = `Bearer`;
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    res.status(400);
    throw new Error('User already exists');
  }

  await User.create({
    username,
    password,
  });

  res.json({ message: 'success' });
});

export { loginUser, registerUser };
