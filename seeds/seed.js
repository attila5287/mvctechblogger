const sequelize = require('../config/connection');
const { User, Post,Reply, Category, Usercat } = require('../models');

const user_j = require('./json/users.json');
const post_j = require('./json/posts.json');
const cats_j = require('./json/cats.json');
const reply_j = require('./json/replies.json');
const usercat_j = require('./json/usercats.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(user_j, {
    individualHooks: true,
    returning: true,
  });
  
  const cats = await Category.bulkCreate(cats_j, {
  }).catch(e => console.log(e));
  
  const posts = await Post.bulkCreate(post_j, {
  }).catch(e => console.log(e));
  
  
  const replies = await Reply.bulkCreate(reply_j, {
  }).catch(e => console.log(e));
  
  
  const usercategories = await Usercat.bulkCreate(usercat_j, {
    returning: true,
  }).catch(e => console.log(e));
  
  process.exit(0);
};


seedDatabase();
