const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ["username"]
                }
            ]
        });
        // console.log(blogPostData)
        const blogs = blogPostData.map((singleBlog) => singleBlog.get({ plain: true}));
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router