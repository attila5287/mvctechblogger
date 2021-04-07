const router = require('express').Router();
const posts = require('./posts');
const userRoutes = require('./userRoutes');

router.use('/posts', posts);
router.use('/users', userRoutes);

module.exports = router;
