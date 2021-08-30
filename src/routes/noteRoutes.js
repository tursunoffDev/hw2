import express from 'express';
import {
  getUserNotes,
  getUserNoteById,
  addUserNotes,
  updateUserNoteById,
  toggleCompletedForUserNoteById,
  deleteUserNoteById
} from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getUserNotes);
router.route('/').post(protect, addUserNotes);
router
  .route('/:id')
  .get(protect, getUserNoteById)
  .put(protect, updateUserNoteById)
  .patch(protect, toggleCompletedForUserNoteById)
  .delete(protect, deleteUserNoteById)

export default router;
