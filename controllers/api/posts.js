const withAuth = require('../../utils/auth');
const router = require( 'express' ).Router();
const { Post } = require('../../models');


// need this for select menu to load user's posts
router.get( '/user/:id', async ( req, res ) => {
  try {
  const models = await Post.findAll( {
    include: {
      all: true,
      nested: true,
    }
    , where: {
      id: req.params.id
    }
  }
   ).catch( e => console.log(e));

    const all = models.map( p => p.get( {
      plain: true
    } ) );

    res.json( all );

  } catch ( error ) {
    res.json( error );

  }
} );

router.get( '/', async ( req, res ) => {
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

module.exports = router;
