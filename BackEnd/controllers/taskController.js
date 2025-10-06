const Task = require('../models/Task');

//get all todos
const getTask = async (req, res) => {
  try{
    const task = await Task.find({user: req.user.id});
    res.json(task);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ error: 'data base error'});
  }
};

//post create a todos
const createTask = async (req, res) => {
  try{
    const { title } = req.body;
    const newTask = new Task({ title, user: req.user.id });
    await newTask.save();
    res.json(newTask);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

//get task by id
const getTaskByID = async (req, res) => {
  try{
      const task = await Task.findOne({ 
        _id: req.params.id, 
        user: req.user.id //filtre par propriétaire
      });

    if (!task){
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

// PUT update task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const updates = {};

    if (title !== undefined) updates.title = title;
    if (completed !== undefined) updates.completed = completed;

     const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id }, // 🔑 filtre aussi par user
      { title, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });

    return res.json(updatedTask);
  } catch (err) {
    console.error('updateTask error:', err);
    return res.status(500).json({ error: 'Database error' });
  }
};


//Remove task
const removeTask = async (req, res) => {
  try{
    const { id } = req.params;
    const deletedID = await Task.findOneAndDelete({_id: id, user: req.user.id});

    if (!deletedID){
      return res.status(404).json({error: 'Task not found'});
    }

    res.json({message: 'Task deleted'});
  }
  catch (err){
    console.error(err);
    res.status(500).json({ error: 'data base error'});
  }
}

module.exports = { getTask, createTask, getTaskByID, updateTask, removeTask};