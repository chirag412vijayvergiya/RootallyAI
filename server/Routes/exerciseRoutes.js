const express = require('express');
const exerciseController = require('../controllers/exerciseController');

const router = express.Router();

// Route to fetch categories and exercises
router.get('/exercises', exerciseController.getCategoriesAndExercises);

// Route to fetch saved programs
router.get('/programs', exerciseController.getPrograms);

// Route to save a new exercise program
router.post('/programs', exerciseController.saveProgram);

// Route to clear all saved programs
router.delete('/programs/:exerciseId', exerciseController.deleteExercise);

module.exports = router;
