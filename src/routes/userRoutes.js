import express from 'express';
import {
  getProfileInfo,
  changeProfilePassword,
  deleteProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/me')
  .get(protect, getProfileInfo)
  .patch(protect, changeProfilePassword)
  .delete(protect, deleteProfile);

export default router;
