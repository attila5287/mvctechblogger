const withAuth = require('../utils/auth');
// const path = require( 'path' );
const router = require('express').Router();
// const apiRoutes = require('./api');
const { User, Post, Reply, Category, Usercat } = require( '../models' );

router.put( '/post/:id',async ( req, res ) => {
    // const 
    try {
        const mod = await Post.findByPk( request.params.id, { include: { all: true } } ).catch( e => console.log( e ) );
        
        mod.update(req.body);
        const ser = mod.get( { plain: true } );
        res.json( ser );
        // res.redirect( '/dashboard' );
    } catch (error) {
        console.log('error :>> ', error);
    }

});


router.post( '/post', async ( req, res ) => {
  try {
    const curr_user_id = req.session.user_id || 1;
    const new_post = await Post.create({
      ...req.body,
      user_id: curr_user_id,
    });
    // res.status( 200 ).json( newProject );
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get( '/api/posts/user/:id', async ( req, res ) => {
  try {
    const models = await Post.findAll( {
      where: {
        user_id: req.params.id,
        // user_id: req.session.user_id,
      }
    }, { include: { all: true } } ).catch( e => console.log( e ) );
    
    const all = models.map( p => p.get( { plain: true } ) );
  
    res.json( all );
    
  } catch ( error ) {
    res.json( error );
    
  }
});


router.get( '/post/:id',async ( req, res ) => {
  try {
    const mod = await Post.findByPk(req.params.id);
    const ser = mod.get( { plain: true } ); //serialized
    res.json( ser );
  } catch (error) {
    // console.log(error);
    res.json(error)
  }
});
router.get( '/api/posts', async ( req, res ) => {
  
  const models = await Post.findAll( { 
      where: {
        user_id: req.params.id,
        // user_id: req.session.user_id,
      },include: { all: true } } ).catch(e=>console.log(e));
  console.log(models);
// const all = models.map( p => p.get( { plain: true } ) );
//   res.json( all );
});

router.get('/api/posts', async (req, res) => {
  const models = await Post.findAll( { include: { all: true } } );
  const all = models.map( p => p.get( { plain: true } ) );
  res.json( all );
});

router.post('/post', async (req, res) => {
  try {
    const curr_user_id = req.session.user_id || 1;
    const new_post = await Post.create({
      ...req.body,
      user_id: curr_user_id,
    });
    // res.status( 200 ).json( newProject );
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/new_Post', withAuth, (req, res) => {
  res.render('new_Post',{ logged_in: req.session.logged_in, user_id: req.session.user_id,});
});

router.get('/Posts/:id', withAuth, async (req, res) => {
  const pro_model = await Post.findByPk( req.params.id, { include: { all: true } } ).catch(e=>console.log(e))
  // res.json( pro.get( { plain: true } ) );

  const pro = pro_model.get( { plain: true } )

  const user_model = await User.findByPk( req.session.user_id ).catch( e => console.log( e ) );
  const user = user_model.get( { plain: true } );
  res.render('Post', {pro, user, logged_in : req.session.logged_in, user_id : req.session.user_id})

});

