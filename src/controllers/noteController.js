import asyncHandler from 'express-async-handler';
import Note from '../models/noteModal.js';
import User from '../models/userModal.js';

export const getUserNotes = asyncHandler(async (req, res) => {
  const { offset = 0, limit = 5 } = req.query;
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(500);
    throw new Error('User not found');
  }
  const userNotes = await Note.find({ userId: user._id });
  const limitNotes = userNotes.slice(0, limit);
  const notes = limitNotes.slice(offset);
  const count = userNotes.length;

  const response = {
    offset,
    limit,
    count,
    notes,
  };
  res.json(response);
});

export const addUserNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { text } = req.body;
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  const note = {
    userId: user._id,
    text,
  };
  try {
    await Note.create(note);
    res.json({ message: 'success' });
  } catch (err) {
    res.status(500);
    throw new Error(err?.message);
  }
});

export const getUserNoteById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const note = await Note.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  if (note) {
    res.json({
      note,
    });
  } else {
    res.status(400);
    throw new Error('Note not found');
  }
});

export const updateUserNoteById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const note = await Note.findById(req.params.id);
  const { text } = req.body;
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  if (text) {
    note.text = text;
    await note.save();
    res.json({
      message: 'success',
    });
  } else {
    res.status(400);
    throw new Error('Note not found');
  }
});

export const toggleCompletedForUserNoteById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const note = await Note.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  try {
    note.completed = !note.completed;
    await note.save();
    res.json({
      message: 'success',
    });
  } catch (err) {
    res.status(500);
    throw new Error(err?.message);
  }
});

export const deleteUserNoteById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  await Note.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500);
      throw new Error(err?.message);
    }
  });
  res.json({ message: 'success' });
});
