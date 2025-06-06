const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userController = require('../contollers/usercontroller');

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

module.exports = router;
