// import models
const User = require( './User' );
const Post = require( './Post' );
const Reply = require('./Reply');
const Category = require( './Category' );
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

// Products belongsTo Category
Post.belongsTo(Category,{
  foreignKey:'category_id',
  onDelete:'CASCADE'
});

// Categories have many Products
Category.hasMany(Post,{
  foreignKey:'category_id',
  onDelete:'CASCADE'
});


module.exports = {
  User,
  Post,
  Reply,
  Category,
};
