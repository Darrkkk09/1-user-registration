const express = require('express');
const router = express.Router();
const captainController = require('../contollers/captaincontroller');
const { body, validationResult } = require('express-validator');
const blist = require('../models/blist');
const captain = require('../models/captainmodel');
const auth = require('../middlewares/authMWare');


router.post('/register', [
    body('firstName').isLength({ min: 1 }).withMessage('First name is required'),
    body('lastName').optional().isLength({ min: 1 }).withMessage('Last name must be at least 1 character long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), // Fixed validation
    body('Vplate').isLength({ min: 1 }).withMessage('Vehicle plate is required'),
    body('Vtype').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be one of: car, bike, auto'),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    captainController.register(req, res, next); // Properly invoked
});

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long')
], (req, res, next) => { 
    const er = validationResult(req);
    if (!er.isEmpty()) {
        return res.status(400).json({ errors: er.array() });
    }
    captainController.login(req, res, next); 
});

router.get('/profile',auth.authcap, captainController.profile)
router.get('/logout', auth.authcap, captainController.logout)









module.exports = router;
