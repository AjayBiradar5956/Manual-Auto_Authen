{
    // Method to submit form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    console.log("the data is", data);
                },
                error: function (err) {
                    console.log(err.responseText);
                }
            })
            this.reset();
        })
    }

    //Method to create a post in DOM
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
        <p>
           
                <small>
                    <a class='delete-post-button' class="delete-post-button" href="/post/destroy/${post._id}">X</a>
                </small>
                    ${post.content}
                        <small>
                            ${post.user.name};
                        </small>
        </p>
    
    
        <div class="post-comments">
           
    
                <form action="comment/create" method="POST">
                    <input type="text" placeholder="Enter your Comment" name="content" required>
                    <br>
                    <input type="hidden" name="post" value="${post._id}">
                    <br>
                    <input type="submit" value="Add Comment">
                </form>
     
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                        </ul>
                    </div>
        </div>
    
    </li>`)
    }

    //Method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function (err) {
                    console.log(err.responseText);
                }
            })
        })
    }

    createPost();
}
