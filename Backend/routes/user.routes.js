const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userController = require('../contollers/usercontroller');
const authMW = require('../middlewares/authMWare');
const Blacklist = require('../models/blist');


router.post('/register', [
    body('firstName').isLength({ min: 1 }).withMessage('First name is required'),
    body('lastName').optional().isLength({ min: 1 }).withMessage('Last name must be at least 1 character long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        console.log(errors.array());
    }

    await userController.registerUser(req, res, next);
});
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email '),
    body('password').isLength({min : 4}).withMessage('password must be at least 4 characters long')
],
    userController.loginUser

);

router.get('/profile',authMW.authOrNo, async (req,res)=>{
    userController.getprofile;
})
router.get('/logout',authMW.authOrNo, (req, res,next) => {
    userController.logoutUser(req, res,next);
});


module.exports = router;
