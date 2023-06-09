const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require("../controller/user_controller");


router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.get('/sign-out', userController.destroySession);
router.post('/create', userController.create);

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);

//manual auth
// router.post('/create-session', userController.createSession);

// passport auth
router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: 'user/sign-in',
        failureMessage: true,
    }
), userController.createSession);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'user/sign-in' }), userController.createSession);

module.exports = router;