const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

 
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const name = `${firstName} ${lastName}`;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser){
      return res.status(400).render('error',{message : 'Email is already registered'});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).render('error', {message : 'Invalid Credentials.'});
    }

    const token = jwt.sign({ ID: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {message : 'Server Error'});
  }
};


exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
