const withAuth = require('../utils/auth');
// const path = require( 'path' );
const router = require('express').Router();
const apiRoutes = require('./api');
const { Project, User } = require('../models');

router.use('/api', apiRoutes);

// route to get all dishes
router.get('/', async (req, res) => {
  // We find all dishes in the db and set the data equal to dishData
  const proData = await Project.findAll({ include: { all: true } }).catch(
    (err) => {
      res.json(err);
    }
  );
  // We use map() to iterate over dishData and then add .get({ plain: true }) each object to serialize it.
  const all = proData.map((p) => p.get({ plain: true }));
  // We render the template, 'all', passing in dishes, a new array of serialized objects.
  // res.status(200).json(all);
  res.render('all', { all, logged_in: req.session.logged_in,  user_id: req.session.user_id, });
});


// Login route
router.get( '/login', ( req, res ) => {
  // console.log(res.session.logged_in);
  // If the user is already logged in, redirect to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

// Signup route
router.get( '/signup', ( req, res ) => {
  // console.log(res.session.logged_in);
  // If the user is already logged in, redirect to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('signup');
});

router.get('/new_project', withAuth, (req, res) => {
  res.render('new_project',{ logged_in: req.session.logged_in, user_id: req.session.user_id,});
});

router.get('/projects/:id', withAuth, async (req, res) => {
  const pro_model = await Project.findByPk( req.params.id, { include: { all: true } } ).catch(e=>console.log(e))
  // res.json( pro.get( { plain: true } ) );

  const pro = pro_model.get( { plain: true } )

  const user_model = await User.findByPk( req.session.user_id ).catch( e => console.log( e ) );
  const user = user_model.get( { plain: true } );
  res.render('project', {pro, user, logged_in : req.session.logged_in, user_id : req.session.user_id})

});


// route to get all dishes
router.get('/profile/:id',withAuth, async (req, res) => {
  // We find all dishes in the db and set the data equal to dishData
  const user_model = await User.findByPk(req.params.id, { include: { all: true } }).catch(
    (err) => {
      res.json(err);
    }
  );
  // We use map() to iterate over dishData and then add .get({ plain: true }) each object to serialize it.
  const user = user_model.get( { plain: true } );
  console.log(user);

  // We render the template, 'all', passing in dishes, a new array of serialized objects.
  // res.status(200).json(all);
  res.render('profile', {user,  logged_in: req.session.logged_in, user_id: req.session.user_id,});
});


router.get('/pros', async (req, res) => {
  try {
    const pros = await Project.findAll({ include: { all: true } });
    // res.status( 200 ).json( pros );
    const all = pros.map((p) => p.get({ plain: true }));
    res.status(200).json(all);
  } catch (error) {
    res.status(400).json(err);
  }
});

module.exports = router;
