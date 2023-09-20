const commentForm = document.getElementById('comment-form');

async function createComment(event) {
    event.preventDefault();
    const newComment = document.getElementById('create-comment').value;
    const blogId = document.getElementById('blog-id').value;
    const newCommentResponse = await fetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify({content: newComment, blog_id: blogId}),
        headers: { 'Content-Type': 'application/json' }
    })
    if (newCommentResponse.ok){
        document.location.reload();
    } else {
        alert("Something went wrong")
    };
};


commentForm.addEventListener('submit', createComment)