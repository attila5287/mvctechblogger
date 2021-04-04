// import models
const User = require( './User' );
const Post = require( './Post' );
const Reply = require('./Reply');
const Category = require( './Category' );
require( '../config/connection' )


// Products belongsTo Category
Post.belongsToMany( Reply,
  {
  through : Reply,
  foreignKey:'post_id',
  onDelete:'CASCADE'
});
Post.belongsTo(User,{
  through:Post,
  foreignKey:'user_id',
  onDelete:'CASCADE'
});
Post.belongsTo(Category,{
  through:Post,
  foreignKey:'category_id',
  onDelete:'CASCADE'
});

Reply.belongsTo(Post,{
  foreignKey:'post_id',
  onDelete:'CASCADE'
});
Reply.belongsTo(User,{
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
