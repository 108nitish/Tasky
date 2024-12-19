const express = require('express');
const bodyParser = require('body-parser');
const Task = require('../models/Task');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addTask, getTasks, editTask, getCTasks, nextWeek} = require('../controllers/taskController');

router.use(authMiddleware); 
router.get('/all-tasks', getTasks);
router.get('/completed-tasks', getCTasks);
router.get('/week', nextWeek);
router.get('/add-task', (req, res)=>{
  if(!req.user){
    return res.render('login', {user : null});
  }
  res.render('add-task', { user: req.user});
});
router.post('/add-task', addTask);
router.get('/edit-task/:id', async (req, res) => { 
  if(!req.user){
    return res.render('login', {user : null});
  }
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).render('error',{message :'Task not found.'});
      }
      res.render('edit-task', {user : req.user, task : task, taskId : req.params.id});
    } catch (err) {
      console.error(err);
      res.status(500).render('error',{message :'Server Error'});
    }
});

router.get('/delete-task/:id', async(req,res)=>{
    try {
        await Task.findByIdAndDelete(req.params.id);  
        res.redirect('/home');
      } catch (err) {
        console.error(err);
        res.status(500).render('error',{message :'Server Error'});
      }
});
  
router.post('/edit-task/:id', editTask);  
  
module.exports = router;
