const paginate = require('express-paginate');
const withAuth = require( '../utils/auth' );
// const path = require( 'path' );
const router = require( 'express' ).Router();
const post = require( './post' );
router.use( '/post', post );
const apiRoutes = require( './api' );
router.use( '/api', apiRoutes );
router.use( paginate.middleware( 10, 50 ) );

const {
  User,
  Post,
  Reply,
  Category,
  Usercat
} = require( '../models' );


router.get( '/', async ( req, res ) => {

 
  const post_m = await Post.findAll( {
    limit: req.query.limit, offset: req.skip,
    include: {
      all: true,
      nested: true,
    },
  }
   ).catch( e => console.log(e));
   const itemCount = post_m.count;
  console.log('itemC :>> ', itemCount);
  const pageCount = Math.ceil( post_m.count / req.query.limit );
   console.log('\npagecount :>> ', pageCount);
  
  const all = post_m.map(p=> p.get( {plain: true} ));
 
  
  // res.status(200).json(post_m);
  res.render( 'all', {
      all,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
    pageCount,
    itemCount,
    pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
  } );
} );

router.get( '/dashboard/:id', async ( req, res ) => {

  const user_model = await User.findByPk( req.params.id, {
    include: {
      all: true
    }
  } ).catch(
    ( err ) => {
      res.json( err );
    }
  );
  const user = user_model.get( {
    plain: true
  } );

  const users_posts = await Post.findAll( {
    include: {
      all: true,
      nested: true,
    }
    , where: {
      user_id: req.params.id
    }
  }
   ).catch( e => console.log(e));

  const posts = users_posts.map( p => p.get( {
    plain: true
  } ) );

  const cats_models = await Category.findAll().catch( e => console.log( e ) );
  const cats = cats_models.map( c => c.get( {
    plain: true
  } ) );
  // res.json(posts)
  res.render( 'dashboard', {
    user,
    cats,
    posts,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
  } );

} );

// Login route
router.get( '/login', ( req, res ) => {
  // console.log(res.session.logged_in);
  // If the user is already logged in, redirect to the homepage
  if ( req.session.logged_in ) {
    res.redirect( '/' );
    return;
  }
  // Otherwise, render the 'login' template
  res.render( 'login' );
} );

// Signup route
router.get( '/signup', ( req, res ) => {
  // console.log(res.session.logged_in);
  // If the user is already logged in, redirect to the homepage
  if ( req.session.logged_in ) {
    res.redirect( '/' );
    return;
  }
  // Otherwise, render the 'login' template
  res.render( 'signup' );
} );


module.exports = router;
