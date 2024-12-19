const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('../models/Task');

exports.addTask = async (req, res) => {
  if (!req.user) {
    return res.render('login', {user : null});
  }
  
  const { title, description, dueDate, priority, status } = req.body; 
  try {
    const task = new Task({
      user: req.user.ID,
      title,
      description,
      dueDate,
      priority,
      status
    });
    await task.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).rebder('error',{message :'Server Error'});
  }
};

 
exports.editTask = async (req, res) => {
  if (!req.user) {
    return res.render('login', {user : null});
  }

  try { 
    const { title, description, dueDate, priority, status } = req.body;

    const task = await Task.findById(req.params.id); 
    if (!task) {
      return res.status(404).render( 'error',{ message :'Task not found'});
    }

    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    task.status = status;

    await task.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).render('error',{message : 'Server Error'});
  }
};


exports.getTasks = async (req, res) => {
  if (!req.user) {
    return res.render('login', {user : null});
  }

  try {
    const tasks = await Task.find({ user: req.user.ID });
    res.render('all-tasks', { user: req.user, tasks });
  } catch (err) {
    console.error(err);
    res.status(500).render('error',{message :'Server Error'});
  }
};

exports.getCTasks = async (req, res) => {
  if (!req.user) {
    return res.render('login', {user : null });
  }

  try {
    const tasks = await Task.find({ user: req.user.ID, status : 'Completed'} );
    res.render('completed-tasks', { user: req.user, tasks });
  } catch (err) {
    console.error(err);
    res.status(500).render('error',{message :'Server Error'});
  }
};

exports.nextWeek = async (req, res) => {
  if (!req.user) return res.render('login', { user: null });
  try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);  
      const nextWeekTasks = []; 
      for (let i = 0; i < 7; i++) {
          const dateToCheck = new Date(today);
          dateToCheck.setDate(today.getDate() + i);  
          dateToCheck.setHours(0, 0, 0, 0);  
          const tasks = await Task.find({
              user: req.user.ID,
              dueDate: {
                  $gte: dateToCheck,
                  $lt: new Date(dateToCheck).setDate(dateToCheck.getDate() + 1)  
              }
          });
          
          nextWeekTasks.push({ date: dateToCheck.toLocaleDateString(), tasks });  
      } 
      res.render('week', { user: req.user, nextWeekTasks });
  } catch (err) {
      console.error(err);
      res.status(500).render('error',{message :'Server Error'});
  }
};


