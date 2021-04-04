// import models
const User = require( './User' );
const Post = require( './Post' );
const Reply = require('./Reply');
const Category = require( './Category' );
require( '../config/connection' )

Reply.belongsTo(Post,{
  foreignKey:'post_id',
  onDelete:'CASCADE'
});
Reply.belongsTo(User,{
  foreignKey:'user_id',
  onDelete:'CASCADE'
});

Post.belongsTo(User,{
  foreignKey:'user_id',
  onDelete:'CASCADE'
});
Post.belongsTo(Category,{
  foreignKey:'category_id',
  onDelete:'CASCADE'
});

// Products belongsTo Category
Category.hasMany( Post,
  {
  foreignKey:'category_id',
  onDelete:'CASCADE'
});
// Products belongsTo Category
Post.hasMany( Reply,
  {
  foreignKey:'post_id',
  onDelete:'CASCADE'
});
User.hasMany( Reply, {
  foreignKey:'user_id',
  onDelete:'CASCADE'
});


// Products belongsTo Category

module.exports = {
  User,
  Post,
  Reply,
  Category,
};
