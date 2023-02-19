# API Documentation

### Table of Contents

[Login](#login)

- [Routes](#login-routes)
  
[Tutorials](#tutorials)

- [Routes](#tutorials-routes)

## Login

Login Information has the following structure:

wip

### Routes {#login-routes}

## Tutorials

A tutorial has the following structure:

`id`: The unique ID of each post, used to retrieve it. This is randomly assigned at post creation time.

`title`: The post's title.

`location`: The location of the tutorial resource contained in the post. This can be a URL, an ISBN, or something else. This is unique for every post.

`user`: The username of the user posting the post.

`postTime`: The time the tutorial post was created, formatted as a Unix time integer.

`editTime`: The time the tutorial post was last edited, formatted as a Unix time integer, if the post has been edited. Otherwise, this is equal to `postTime`.

`score`: The score this post has based on the number of votes up and down it has received. At post creation time, this should be 0, and should not change if a post is edited.

### Routes {#tutorials-routes}

#### POST /api/tutorials {#post-tutorials}

Used to create a new tutorial post in the database.

Returns: The new post object if the creation was successful, or an error if the object was incorrectly formatted or the `location` was not unique.

#### GET /api/tutorials {#get-tutorials-all}

Used to get all tutorials currently in the database.

Returns: An object containing all tutorials.

#### GET /api/tutorials/:id {#get-tutorials}

Used to get a single tutorial post with that ID.

Returns: The object matching the ID in the call, or an error if no post exists with that ID.

#### PUT /api/tutorials/:id {#put-tutorials}

Used to change the information of the post with that ID. Only the following should be edited with this call:

`title`
`location`

Returns: The object matching the ID with the new information, or an error if no post exists with that ID, a post already exists with the new `location`, or the object was incorrectly formatted.

#### DELETE /api/tutorials/:id {#delete-tutorials}

Used to delete the post with that ID.

Returns: WIP
