require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const Task = require('./models/Task'); 
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const app = express(); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(authMiddleware); 


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err)); 


app.get('/getUserInfo', (req, res) => {
  const token = req.cookies.token;  
  if (token) { 
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
              return res.status(401).send('Unauthorized');
          } 
          res.json({ ID: decoded.ID, name: decoded.name });
      });
  } else {
      res.status(401).send('Unauthorized: No token provided');
  }
});


app.get('/', async (req, res) => {
  if (req.user) {
    try {
      const now = new Date(); 
      now.setHours(0, 0, 0, 0);  
      const threeDaysFromNow = new Date(); 
      threeDaysFromNow.setHours(0, 0, 0, 0); 
      threeDaysFromNow.setDate(now.getDate() + 3);
      
      const priorityMap = { 'Low': 1, 'Medium': 2, 'High': 3 };

      const tasks = await Task.find({
        user: req.user.ID,
        dueDate: { $gte: now, $lte: threeDaysFromNow }
      }).lean(); 
      
      tasks.sort((a, b) => { 
        const dueDateDiff = new Date(a.dueDate) - new Date(b.dueDate);
        if (dueDateDiff !== 0) return dueDateDiff;
        
        const priorityDiff = priorityMap[b.priority] - priorityMap[a.priority];
        return priorityDiff;
      });
 
      res.render('home', {
        user: req.user, 
        tasks
      });
    } catch (err) {
      console.error(err);
      res.status(500).render('error',{message :'Server Error'});
    }
  } else {
    res.render('home', { user: null, pathname: '/' });
  }
});

// Stuff related to mailing
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.our_email,
    pass: process.env.email_pass
  }
});

// Function to send email reminders
function sendEmailReminder(name, emailBody, recipientEmail) {
  const mailOptions = {
    from: process.env.our_email,
    to: recipientEmail,
    subject: `🔔 Reminder: ⚠️Deadline is Near.\n`,
    text: ` Namaskar🙏🙏, Mr/Mrs  ${name} \n` +
          `${emailBody}\n\n` +
          `📝 Please make sure to complete these before the deadline! \n\n` +
          `Thank you! 😊\n\n\n` +
          `It's just a remainder, Please don't reply this.🙏🙏`
  };


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
      console.log('Message sent: ' + info.response);
    });
}
 
async function getTasksForAllUsers() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const next = new Date(now);
  next.setDate(now.getDate() + 2);

  try { 
    const users = await User.find();

    for (const user of users) {  
    const tasks = await Task.find({
    user: user._id,
    dueDate: { $gte: now, $lte: next },
    status: { $ne: 'Completed' }
    }).lean(); 
    
  if (tasks.length > 0) { 
    const taskList = tasks.map(task => `- ${task.title} (Due: ${task.dueDate.toDateString()}) is ${task.status}`).join('\n');

    const emailBody = `You have the following tasks due soon:\n\n` + `${taskList}`;
    sendEmailReminder(user.name, emailBody, user.email);
  }
} 
  } catch (err) {
    console.error('Error fetching tasks for users:', err);
  }
}
 
cron.schedule('0 8 * * *', () => {
  console.log('Checking tasks for due dates...');
  getTasksForAllUsers();
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
}); 

app.use('/', require('./routes/auth'));
app.use('/', require('./routes/tasks'));
app.use('/', require('./routes/notes'));

app.listen(process.env.PORT || 1234, () => {
  console.log(`Listening on http://localhost:${process.env.PORT || 1234}`);
});