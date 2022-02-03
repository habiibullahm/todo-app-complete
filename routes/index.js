const express = require("express")
const router = express.Router()
const userRoutes = require('./user')
const todoRoutes = require('./todo')

const passport = require('passport')
require('../helpers/passport')
 
router.use('/user', userRoutes)
router.use('/todo', todoRoutes)

/* OAuth Google */
router.get(
    '/auth/google',
    passport.authenticate('google', 
    { scope: ['email', 'profile'],
    session: false,
     })
  );
  
router.get(
    '/auth/google/callback',
    passport.authenticate('google',
    { failureRedirect: '/login',
    session : false,
     }),
    function (req, res) {
    //   Successful authentication, redirect home.
      res.status(201).json({ 
          success : true,
          user : req.user
      });
    }
  );

module.exports = router