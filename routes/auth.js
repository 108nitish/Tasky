const express = require('express'); 
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { register, login, logout} = require('../controllers/authController'); 

router.use(authMiddleware); 
router.get('/register', (req, res) => res.render('register', {user : req.user}));
router.post('/register', register);
router.get('/login', (req, res) => res.render('login', {user: req.user}));
router.post('/login', login);
router.get('/logout', logout);   

module.exports = router;