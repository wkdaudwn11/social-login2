const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
//const passportConf = require('../passport');

const {validateBody, schemas} = require('../helpers/routeHelpers');
const UsersController = require('../controllers/usersController');

router.route('/signUp')
    .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signIn')
    .post(UsersController.signIn);

router.route('/secret')
    .get(passport.authenticate('jwt', {session: false}), UsersController);

module.exports = router;