const withAuth = require('../../utils/auth');
const router = require( 'express' ).Router();
const { User } = require('../../models');

router.post( '/edit/:id', async ( req, res ) => {
  const updated_user = await User.update( req.body, {
    where: {
      id: req.params.id,
    },
  } ).catch( e => console.log( e ) );

  res.redirect(req.header('Referrer'));
});

router.post('/', async (req, res) => {
  try {

    console.log(req.body);

    const userData = await User.create(req.body).catch(e=>console.log(e));

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log(req.session);
      res.json({ user: userData, message: 'You are now logged in!' });
    });
    
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', withAuth, (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      // res.json({ message: 'You are now logged out!' });
      // res.status(204).end();
      res.redirect( '/' );
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
