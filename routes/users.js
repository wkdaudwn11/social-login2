const express = require('express');
const router = require('express-promise-router')();

const {validateBody, schemas} = require('../helpers/routeHelpers');
const UsersController = require('../controllers/usersController');

router.route('/signUp')
    .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signIn')
    .post(UsersController.signIn);

router.route('/secret')
    .post(UsersController.secret);

module.exports = router;