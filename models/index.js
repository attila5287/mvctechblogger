// import models
const User = require( 'User' );
const Post = require( 'Post' );
const Reply = require('Reply');
require( '../config/connection' )

// Products belongsTo Category
Reply.belongsTo(Post,{
  foreignKey:'post_id',
  onDelete:'CASCADE'
});

// Categories have many Products
Post.hasMany(Reply,{
  foreignKey:'post_id',
  onDelete:'CASCADE'
});
// Products belongsTo Category
Post.belongsTo(User,{
  foreignKey:'user_id',
  onDelete:'CASCADE'
});

// Categories have many Products
User.hasMany(Post,{
  foreignKey:'user_id',
  onDelete:'CASCADE'
});



module.exports = {
  User,
  Post,
  Reply,
};
