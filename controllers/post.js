const withAuth = require( '../utils/auth' );
// const path = require( 'path' );
const router = require( 'express' ).Router();
const {   User, Post, Reply, Category, Usercat } = require( '../models' );

router.get( '/delete/:id', withAuth, async ( req, res ) => {
  const post = await Post.destroy( {where:{id:req.params.id}} ).catch( e => console.log( e ) );
  
  res.redirect( req.header( 'Referrer' ) );
});

router.post('/h/reply/:id',withAuth, async (req, res) => {
  const new_reply = await Reply.create( {...req.body, user_id: req.session.user_id, post_id:req.params.id}  ).catch( e => console.log( e ) );


  // res.json( new_reply );
  res.redirect( '/' );
  
});


router.post('/reply/:id',withAuth, async (req, res) => {
  const new_reply = await Reply.create( {...req.body, user_id: req.session.user_id, post_id:req.params.id}  ).catch( e => console.log( e ) );


  // res.json( new_reply );
  res.redirect( '/post/view/' + req.params.id );
  
});


router.get( '/user/:id', async ( req, res ) => {

  const post_m = await Post.findAll( {
    include: {
      all: true,
      nested: true,
    }
    , where: {
      user_id: req.params.id
    }
  }
   ).catch( e => console.log(e));

  const post = post_m.map(p=> p.get( {plain: true} ));

  const user_m = await User.findByPk( req.session.user_id ).catch( e => console.log( e ) );
  const user = user_m.get( { plain: true } );
  
  // res.json( post );
  res.render( 'view_post', {
    post,
    user,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
    post_id : req.params.id
  } );

} );


router.get( '/view/:id', async ( req, res ) => {

  const post_m = await Post.findAll( {
    include: {
      all: true,
      nested: true,
    }
    , where: {
      id: req.params.id
    }
  }
   ).catch( e => console.log(e));

  const post = post_m.map(p=> p.get( {plain: true} ));

  const user_m = await User.findByPk( req.session.user_id ).catch( e => console.log( e ) );
  const user = user_m.get( { plain: true } );
  
  // res.json( post );
  res.render( 'view_post', {
    post,
    user,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
    post_id : req.params.id
  } );

} );

router.get( '/:id', withAuth, async ( req, res ) => {
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
    logged_in: req.session.logged_in,
    user_id: req.session.user_id
  } )
} );


router.put( '/:id', async ( req, res ) => {
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

router.post( '/', async ( req, res ) => {
  try {
    const curr_user_id = req.session.user_id || 1;
    const new_post = await Post.create( {
      ...req.body,
      user_id: curr_user_id,
    } ).catch( e => console.log(e));
    // res.status( 200 ).json( new_post );
    res.redirect( '/dashboard/' + curr_user_id );
  } catch ( err ) {
    res.status( 400 ).json( err );
  }
} );



module.exports = router;
