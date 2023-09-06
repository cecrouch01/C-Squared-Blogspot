const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')

// This is the /api/comments endpoint

//This will create a comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment)
    } catch(err) {
        res.status(400).json(err);
    }
})

//This will delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        })

        if(!deletedComment) {
            res.status(404).json({ message: 'No comment found with this id'});
            return;
        }
        res.status(200).json({message: 'This comment has been deleted'})
    } catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router;