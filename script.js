const allUsers = [
    {
        firstname: 'Ivana',
        lastname: 'Zirojevic',
        username: 'IvanaZ',
        email: 'zira@gmail.com',
        password: '123',
        fullName(){
            return this.firstname + ' ' + this.lastname
        }
    }

]

const userLoginInput = document.querySelector('#login-username');
const passwordLogin = document.querySelector('#login-password');
const loginBtn = document.querySelector('.login-btn');
const loginDiv = document.querySelector('.login-div');
const signinDiv = document.querySelector('.sign-div')
const main = document.querySelector('.main');
const wrongPass = document.querySelector('.wrong-info');
const headerUser = document.querySelector('.ime-prezime')
const logOutBtn = document.querySelector('.log-out')
const signInSwitchBtn = document.querySelector('.sign-in')
const switchLoginBtn = document.querySelector('.switch-to-login')
const signUpBtn = document.querySelector('.sign-up-btn')

//swithcing between login and signin

signInSwitchBtn.addEventListener('click', ()=>{
    loginDiv.classList.add('none')
    signinDiv.classList.remove('none')
    
})

switchLoginBtn.addEventListener('click', ()=>{
    loginDiv.classList.remove('none')
    signinDiv.classList.add('none')
    
})

// logging in 

let currentUser = {};

loginBtn.addEventListener('click', ()=>{


    for (const i of allUsers) {
        if((i.email === userLoginInput.value || i.username === userLoginInput.value) && i.password === passwordLogin.value){
            loginDiv.classList.add('none');
            main.classList.remove('none')
            currentUser = i
            headerUser.innerHTML = currentUser.fullName();
            blogView(allPosts)

        }else{
            wrongPass.classList.remove('none')
        }
        }

})

//logging out 

logOutBtn.addEventListener('click', ()=>{
    loginDiv.classList.remove('none');
    main.classList.add('none')
    wrongPass.classList.add('none')
    currentUser = {}
})

//creating new account


signUpBtn.addEventListener('click', ()=>{
    let newUser = {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    }

    const allInputsForSign = document.querySelectorAll('.inputsign')

    for(let i = 0; i < allInputsForSign.length; i++){

        if(allInputsForSign[i].value.length < 1){
            alert("Fill in all the required inputs")
            return
            
        }
    }

    for (let i of allInputsForSign) {

        for (let key in newUser) {
       newUser[key] = document.querySelector(`#${key}`).value
        }
    }

    newUser.fullName = function(){
        return this.firstname + ' ' + this.lastname
    }

    allUsers.push(newUser)

    loginDiv.classList.remove('none')
    signinDiv.classList.add('none')
})



// displaying all posts

const allPosts = [
    {
        user: 'Ivana Zirojevic',
        title: 'Naslov jednog posta',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        comments: [{
            commentUser: 'Ivana Zirojevic',
            commentContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }]
    }
];

const contetnOfThePage = document.querySelector('.content')

function blogView(pageContentArray){
    let postsHtml = '';
    
    for(let i = pageContentArray.length-1; i >= 0 ; i--){
        let diffUser = ''
        let u = pageContentArray[i]
        if(u.user === currentUser.fullName()){ 
            diffUser = `<button id="${i}" onclick="deletePost(event)" class="delete-post-btn">Delete</button>`
        }
        postsHtml += `<div class="whole-post">
    <div class="card">
        <p class="post-name">${u.user}</p>
       `+ diffUser +`
        <h2 class="post-title">${u.title}</h2>
        <p class="post-content">${u.content}</p>
        <button class="comments-btn" onclick='openComments(event);displayComments(event, ${i})'>Comments</button>      
    </div>
    <div class="comment-section none">
    </div>
    </div>`
}

    contetnOfThePage.innerHTML = postsHtml

}

// openning the comment section 

function openComments(e){
    const commetSectionOfClickedPost = e.target.parentElement.parentElement.children[1]
    commetSectionOfClickedPost.classList.toggle('none')

}


function displayComments(e, i, btn){
    let commentsOfPost = `
    <div class="comment add-comment">
    <textarea id="comment-body" placeholder="Add a comment..."></textarea>
    <button class="post-comment" onclick="addComment(event, ${i})">Post Comment</button>
    </div> 
    `
    let target = e.target;
    if(e === ''){
        target = btn
    }

 

    const commentSectionOfClickedPost =target.parentElement.parentElement.children[1]
    
        const commentsForDisplay = allPosts[i].comments
        for (let j = commentsForDisplay.length-1; j >= 0; j--) {
            let diffUser = `<button onclick="deleteComment(event, ${i}, ${j})" class="dlt-comment-btn">X</button>`


            if(currentUser.fullName() !== commentsForDisplay[j].commentUser){
                diffUser = '';
            }

            commentsOfPost += `
            <div class="comment">
            <span class="user-comment">${commentsForDisplay[j].commentUser}</span>
            <p class="comment-content">${commentsForDisplay[j].commentContent}</p>` + `${diffUser}` +
            `</div>`  

    } 
        
    commentSectionOfClickedPost.innerHTML = commentsOfPost
}

// adding new post 

const postBtn = document.querySelector('.post-btn')
const newPostTitle = document.querySelector('.post-title')
const newPostBody = document.querySelector('#post-body')

postBtn.addEventListener('click', ()=>{
    if(newPostTitle.value.length < 1 || newPostBody.value.length < 1){
        alert('Fill the required fields')
    }else{
        const newPost = {
            user: `${currentUser.fullName()}`,
            title: newPostTitle.value,
            content: newPostBody.value,
            comments: []
        }
    
        allPosts.push(newPost)
        blogView(allPosts)
    
        newPostBody.value = ''
        newPostTitle.value = ''

    }
})

//adding new comments

function addComment(event, i){
    const commentBody = event.target.parentElement.children[0]
    if(commentBody.value.length < 1){return}
    let newComment = {
        commentUser: currentUser.fullName(),
        commentContent: commentBody.value
    }

    const buttonComment = event.target.parentElement.parentElement.parentElement.children[0].children[3]
   
    allPosts[i].comments.push(newComment)

    displayComments('', i, buttonComment)
}

//deleting posts

function deletePost(event){
    const index = event.target.id
    const confirmDlt = confirm('Are you sure you want to delete this post ?')
   
    if(confirmDlt){

        allPosts.splice(index, 1)
        blogView(allPosts)

    }
   
}

//deleting comments 

function deleteComment(event, i, j){

    let correctUser = 3


    if(currentUser.fullName() === event.target.parentElement.parentElement.parentElement.children[0].children[0].innerHTML){
        correctUser = 4
    }

const buttonForDisplaying = event.target.parentElement.parentElement.parentElement.children[0].children[correctUser]
allPosts[i].comments.splice(j, 1)
displayComments('', i , buttonForDisplaying)
}