const fs = require('fs').promises;
const path = require('path');

const catchAsync = require('../utils/catchAsync');

const dataPath = path.join(__dirname, '../data/data.json');

const getData = async () => {
  const data = await fs.readFile(dataPath, 'utf-8');
  return JSON.parse(data);
};

const saveData = async (data) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};

exports.getCategoriesAndExercises = catchAsync(async (req, res) => {
  const data = await getData();
  res.status(200).json({
    categories: data.categories,
    // exercises: data.exercises,
  });
});

exports.getPrograms = catchAsync(async (req, res) => {
  const data = await getData();
  res.status(200).json({ programs: data.programs });
});

exports.saveProgram = catchAsync(async (req, res) => {
  try {
    const data = await getData();

    const programId = Number(req.body.programId);
    const { newExercise } = req.body;

    const program = data.programs.find((prog) => prog.id === programId);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    const transformedExercise = {
      id: Date.now() + Math.floor(Math.random() * 10000),
      name: newExercise.exerciseName || 'Unnamed Exercise',
      sets: Number(newExercise.stat?.sets) || 1,
      reps: Number(newExercise.stat?.reps) || 0,
      holdTime: Number(newExercise.stat?.holdTime) || 0,
      side: newExercise.stat?.side || 'Left',
      daysofWeek: newExercise.selectedDays || [],
      sessionsPerDay: newExercise.sessionsPerDay || 1,
      therapistNotes: newExercise.therapistNotes || '',
    };

    program.exercises.push(transformedExercise);

    await saveData(data);
    res.status(200).json({ message: 'Exercise added successfully', program });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

exports.deleteExercise = catchAsync(async (req, res) => {
  const { exerciseId } = req.params;
  //   console.log(exerciseId);
  const data = await getData();

  const exerciseIdToDelete = parseInt(exerciseId);

  const allExercises = data.programs.flatMap((program) =>
    program.exercises.map((exercise) => ({
      ...exercise,
      programId: program.id,
    })),
  );

  const exerciseToDelete = allExercises.find(
    (exercise) => exercise.id === exerciseIdToDelete,
  );

  if (!exerciseToDelete) {
    return res.status(404).json({ message: 'Exercise not found' });
  }

  const program = data.programs.find(
    (program) => program.id === exerciseToDelete.programId,
  );
  program.exercises = program.exercises.filter(
    (ex) => ex.id !== exerciseIdToDelete,
  );

  await saveData(data);

  res.status(200).json({
    message: `Exercise with ID ${exerciseIdToDelete} deleted`,
  });
});
