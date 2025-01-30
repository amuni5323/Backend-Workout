import Workout from '../models/workoutModel.js';

export const getWorkouts = async (req, res) => {
  try {
    console.log(req.user);
    const workouts = await Workout.find({ user: req.user.id });
    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createWorkout = async (req, res) => {
  try {
    const { title, reps, load, weight } = req.body;
    if (!title || !reps || !load || !weight) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const newWorkout = new Workout({
      title,
      reps,
      load,
      weight,
      user: req.user.id,
    });
    const savedWorkout = await newWorkout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 

export const deleteWorkout = async (req, res) => {
  try {
    const workoutId = req.params.id;
    const deletedWorkout = await Workout.findByIdAndDelete(workoutId);
    
    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

