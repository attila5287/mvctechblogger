const withAuth = require( '../utils/auth' );
// const path = require( 'path' );
const router = require( 'express' ).Router();
const apiRoutes = require( './api' );
router.use( '/api', apiRoutes );

const {
  User,
  Post,
  Reply,
  Category,
  Usercat
} = require( '../models' );

router.post('/reply/:id',withAuth, async (req, res) => {
  new_reply = await Reply.create( {...req.body, user_id: req.session.user_id, post_id:req.params.id}  ).catch( e => console.log( e ) );

  // res.json( new_reply );
  res.redirect( '/view/post/' + req.params.id );
  
});

router.get( '/view/post/:id', withAuth, async ( req, res ) => {

  const post_m = await Post.findByPk( req.params.id, {
    include: {
      all: true
    }
  } ).catch( e => console.log( e ) );
  const post = post_m.get( {
    plain: true
  } );
  // res.json( { 'message': 'success' } );
  res.render( 'view_post', {
    post,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
  } );

} );

router.get( '/post/:id', withAuth, async ( req, res ) => {
  const post_model = await Post.findByPk( req.params.id, {
    include: {
      all: true
    }
  } ).catch( e => console.log( e ) )
  // res.json( pro.get( { plain: true } ) );

  const post = post_model.get( {
    plain: true
  } )

  const user_model = await User.findByPk( req.session.user_id ).catch( e => console.log( e ) );
  const user = user_model.get( {
    plain: true
  } );
  const post_topics = [ {
      value: 3,
      option: "Tips-n-Tricks from masters"
    },
    {
      value: 2,
      option: "Ask about general opinion"
    },
    {
      value: 1,
      option: "Question about how-to-do?"
    },
    {
      value: 4,
      option: "Ask to the masters"
    },
    {
      value: 5,
      option: "Fun facts..."
    },
    {
      value: 6,
      option: "Soft-topic"
    },
    {
      value: 7,
      option: "None of the above"
    },
  ];
  const cats_models = await Category.findAll().catch( e => console.log( e ) );
  const cats = cats_models.map( c => c.get( {
    plain: true
  } ) );
  const selected_cat_m = await Category.findByPk( post.category_id ).catch( e => console.log( e ) );
  const selected_cat = selected_cat_m.get( {
    plain: true
  } );

  res.render( 'post', {
    post,
    user,
    selected_cat,
    cats,
    post_topics,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
  } )
} );


router.put( '/post/:id', async ( req, res ) => {
  // const 
  try {
    const mod = await Post.findByPk( req.params.id ).catch( e => console.log( e ) );

    mod.update( req.body );
    const ser = mod.get( {
      plain: true
    } );
    res.json( ser );
    // res.redirect( '/dashboard' );
  } catch ( error ) {
    console.log( 'error :>> ', error );
  }

} );

// need this for select menu to load user's posts
router.get( '/api/posts/user/:id', async ( req, res ) => {
  try {
    const models = await Post.findAll( {
      where: {
        user_id: req.params.id,
        // user_id: req.session.user_id,
      }
    }, {
      include: {
        all: true
      }
    } ).catch( e => console.log( e ) );

    const all = models.map( p => p.get( {
      plain: true
    } ) );

    res.json( all );

  } catch ( error ) {
    res.json( error );

  }
} );

router.get( '/api/posts', async ( req, res ) => {
  const models = await Post.findAll( {
    include: {
      all: true
    }
  } ).catch( e => console.log( e ) );
  const all = models.map( p => p.get( {
    plain: true
  } ) );
  res.json( all );
} );

router.post( '/post', async ( req, res ) => {
  try {
    const curr_user_id = req.session.user_id || 1;
    const new_post = await Post.create( {
      ...req.body,
      user_id: curr_user_id,
    } );
    // res.status( 200 ).json( new_post );
    res.redirect( '/dashboard/' + curr_user_id );
  } catch ( err ) {
    res.status( 400 ).json( err );
  }
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
    where: {
      user_id: req.params.id
    }
  }, {
    include: {
      all: true
    }
  } );

  const posts = users_posts.map( p => p.get( {
    plain: true
  } ) );

  const post_topics = [ {
      value: 3,
      option: "Tips-n-Tricks from masters"
    },
    {
      value: 2,
      option: "Ask about general opinion"
    },
    {
      value: 1,
      option: "Question about how-to-do?"
    },
    {
      value: 4,
      option: "Ask to the masters"
    },
    {
      value: 5,
      option: "Fun facts..."
    },
    {
      value: 6,
      option: "Soft-topic"
    },
    {
      value: 7,
      option: "None of the above"
    },
  ];
  const cats_models = await Category.findAll().catch( e => console.log( e ) );
  const cats = cats_models.map( c => c.get( {
    plain: true
  } ) );

  res.render( 'dashboard', {
    user,
    post_topics,
    cats,
    posts,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id

  } );

} );

// route to get all dishes
router.get( '/json', async ( req, res ) => {
  // We find all dishes in the db and set the data equal to dishData
  const post_models = await Post.findAll( {
    include: {
      all: true
    }
  } ).catch(
    ( err ) => {
      res.json( err );
    }
  );
  const all = post_models.map( ( p ) => p.get( {
    plain: true
  } ) );
  res.json( all );
} );

// route to get all dishes
router.get( '/', async ( req, res ) => {
  // We find all dishes in the db and set the data equal to dishData
  const post_models = await Post.findAll( {
    include: {
      all: true
    }
  } ).catch(
    ( err ) => {
      res.json( err );
    }
  );
  // We use map() to iterate over dishData and then add .get({ plain: true }) each object to serialize it.
  const all = post_models.map( ( p ) => p.get( {
    plain: true
  } ) );
  // We render the template, 'all', passing in dishes, a new array of serialized objects.
  // res.status(200).json(all);
  res.render( 'all', {
    all,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
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
// route to get all dishes
router.get( '/profile/:id', withAuth, async ( req, res ) => {
  // We find all dishes in the db and set the data equal to dishData
  const user_model = await User.findByPk( req.params.id, {
    include: {
      all: true
    }
  } ).catch(
    ( err ) => {
      res.json( err );
    }
  );
  // We use map() to iterate over dishData and then add .get({ plain: true }) each object to serialize it.
  const user = user_model.get( {
    plain: true
  } );
  console.log( user );

  // We render the template, 'all', passing in dishes, a new array of serialized objects.
  // res.status(200).json(all);
  res.render( 'profile', {
    user,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
  } );
} );


router.get( '/pros', async ( req, res ) => {
  try {
    const pros = await Post.findAll( {
      include: {
        all: true
      }
    } );
    // res.status( 200 ).json( pros );
    const all = pros.map( ( p ) => p.get( {
      plain: true
    } ) );
    res.status( 200 ).json( all );
  } catch ( error ) {
    res.status( 400 ).json( err );
  }
} );

module.exports = router;
