const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require("../controller/user_controller");

router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.get('/sign-out', userController.destroySession);
router.post('/create', userController.create);
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

module.exports = router;