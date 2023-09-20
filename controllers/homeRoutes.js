const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
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

router.get('/dashboard', withAuth, async (req, res) => {
    res.render('dashboard', {
        logged_in: req.session.logged_in
    })
});

router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const singleBlogPost = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                        }
                    ]
                }
            ]
        })
        const blog = singleBlogPost.get({ plain: true })
        console.log(blog)
        res.render('blog', {
            blog,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        alert(err)
    }
})
router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login')
})
module.exports = router