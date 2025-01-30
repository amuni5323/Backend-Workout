import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { getWorkouts, createWorkout } from '../controllers/workoutController.js';
import { deleteWorkout } from '../controllers/workoutController.js';
const router = express.Router();

router.use(requireAuth); // Protect all routes below

router.get('/', getWorkouts);
router.post('/', createWorkout);
router.delete('/:id', deleteWorkout);
  

export default router;
