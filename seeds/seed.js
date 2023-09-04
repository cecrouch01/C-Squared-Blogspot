const sequelize = require('../config/connection');
const {BlogPost, Comment, User} = require('../models');
const blogPostData = require('./blogPostData.json');
const commentData = require('./commentData.json');
const userData = require('./userData.json');

async function seedDatabase() {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, 
        {
        individualHooks: true,    
    }
    );
    console.log('user success')
    await BlogPost.bulkCreate(blogPostData);
    console.log('blog success')

    await Comment.bulkCreate(commentData);
    console.log('comment success')

 

    process.exit(0)
}

seedDatabase();