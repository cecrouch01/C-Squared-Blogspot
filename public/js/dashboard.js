const addBlogBtn = document.getElementById('add-blog');
const cancelAddBlog = document.getElementById('cancel');
const blogForm = document.querySelector('#blog-form');
const blogTitleInput = document.getElementById('create-title');
const blogDescriptionInput = document.getElementById('create-description');
const editBlogBtns = document.querySelectorAll('.edit-blog-btn');
const cancelEditBlog = document.querySelectorAll('.cancel-edit');
const editBlogFrm = document.querySelectorAll('.edit-blog')

//This changes the button ID
function showForm(form, button) {
    form.style.display = 'block';
    button.style.display = 'none';
};

//This hides the form
function cancelForm(form, title, description, btn) {
    form.style.display = 'none';
    //The values go to an empty string so there is no chance of an accidental api call. 
    title.value = '';
    description.value = '';
    btn.style.display = 'block';
};

async function addBlog(e) {
    e.preventDefault();
    const addBlogResponse = await fetch('/api/blog-posts/', {
        method: 'POST',
        body: JSON.stringify({title: blogTitleInput.value, description: blogDescriptionInput.value}),
        headers: { 'Content-Type': 'application/json' }
    })
    if(addBlogResponse.ok){
        document.location.reload();
    } else {
        alert("something went wrong");
    }
};

//I need to create a PUT Route first!
async function editBlog(idNum) {
    // const findBlogResponse = await fetch(`/api/blog-posts/${idNum}`);
    // const findBlog = await findBlogResponse.json()
    const newTitle = document.querySelector(`#edit-title-${idNum}`).valuetitle;
    const newDescription = document.querySelector(`#edit-description-${idNum}`).value;
    const editBlogResponse = await fetch()
};

addBlogBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showForm(blogForm, addBlogBtn )
});

cancelAddBlog.addEventListener('click',(e) => {
    e.preventDefault();
    cancelForm(blogForm, blogTitleInput, blogDescriptionInput, addBlogBtn)
})
blogForm.addEventListener('submit', addBlog)

for(let i = 0; i < editBlogBtns.length; i++){
    let id = editBlogBtns[i].getAttribute('id');
    const editBlogForm = document.querySelector(`#edit-blog-${id}`)
    editBlogBtns[i].addEventListener('click', (e) => {
        e.preventDefault();
        showForm(editBlogForm, editBlogBtns[i])
    })
}

for(let j = 0; j < cancelEditBlog.length; j++) {
    const cancelIDString = cancelEditBlog[j].getAttribute('id');
    const cancelIDNumber = cancelIDString.replace('cancel-', '');
    const editBlogForm = document.querySelector(`#edit-blog-${cancelIDNumber}`);
    const editFormTitle = document.querySelector(`#edit-title-${cancelIDNumber}`)
    const editFormDescription = document.querySelector(`#edit-description-${cancelIDNumber}`)
    cancelEditBlog[j].addEventListener('click', (e) => {
        e.preventDefault();
    const editButton = document.getElementById(cancelIDNumber);
        cancelForm(editBlogForm, editFormTitle, editFormDescription, editButton);
    });
}

for(let k = 0; k < editBlogFrm.length; k++) {
    const editIDString = editBlogFrm[k].getAttribute('id');
    const editIDNumber = editIDString.replace('edit-blog-', '');
    editBlogFrm[k].addEventListener('submit', (e) => {
        e.preventDefault();
        editBlog(editIDNumber);
    })
}

//Edit a blog post
//delete a blog post
//change title validation of Blog Post Model