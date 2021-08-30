import asyncHandler from 'express-async-handler';
import User from '../models/userModal.js';
import bcrypt from 'bcryptjs';

const changeProfilePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, newPassword } = req.body;

  if (oldPassword === '' || newPassword === '') {
    res.status(400);
    throw new Error('Please dont leave blank empty');
  }

  if (user) {
    if (await bcrypt.compare(oldPassword, user.password)) {
      user.password = newPassword;
      await user.save();
      res.json({
        message: 'success',
      });
    } else {
      res.status(400);
      throw new Error('Please insert correct password');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getProfileInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      user: {
        _id: user._id,
        username: user.username,
        createdDate: user.createdDate,
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const deleteProfile = asyncHandler(async (req, res) => {
  await User.findOneAndRemove({ _id: req.user._id }, (err) => {
    if (err) {
      res.status(400);
      throw new Error(err?.message);
    }
  });
  res.json({ message: 'success' });
});

export { getProfileInfo, changeProfilePassword, deleteProfile };
