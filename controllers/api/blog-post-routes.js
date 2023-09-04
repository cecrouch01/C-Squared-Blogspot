const router = require('express').Router();
const { BlogPost, User } = require('../../models');
const withAuth = require('../../utils/auth')

// This is the /api/blog-posts endpoint

//Blog Posts need: get all, get one?, create a blog and delete a blog
//This will get all of the blog posts
router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: [{ 
                model: User
            }]
        });
        res.status(200).json(blogPostData)
    } catch{
        res.status(500).json(err)
    }
});

//This will get a single blog post
router.get('/:id', async (req, res) => {
    try {
        const singleBlogPostData = await BlogPost.findByPk(req.params.id, {
            include: [{ 
                model: User
            }]
        });
        if(singleBlogPostData !== null){
            res.status(200).json(singleBlogPostData)
        } else {
            res.status(400).json({ message: "Oops, it seems like there has been an error"})
        }
    } catch{
        res.status(500).json(err)
    }
});
//This will create a blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlogPost)
    } catch(err){
        res.status(400).json(err)
    }
})
//This will delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedBlogPost = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        if(!deletedBlogPost) {
            res.status(404).json({ message: 'No project found with this id'});
            return;
        }
        res.status(200).json({message: 'This blog post has been deleted'})
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;