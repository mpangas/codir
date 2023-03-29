# Sprint 3 Documentation

## Frontend - Work Completed

## Frontend - Cypress & Unit Tests

## Backend - Work Completed
- Added the Favorite object which correlates a user to a tutorial using a foreign key.
- Added a new property to each user called Favorites which stores a list of Favorite objects that are associated with a user.
- Added functions that allow Favorites for an authenticated user to be viewed, added, and removed
- Finished the routes relating to tutorials, including functionality to get tutorials by ID, add new tutorials, remove tutorials and upvote/downvote tutorials

## Backend - Unit Tests
### User Tests
- Test 1: [/api/get](#get-apiget) - This unit test simulates a GET request to the api/get path which executes a function to return the information for all users in the database. It checks if the status code of the response is 200 to determine if the request is successful.
- Test 2: [/api/signup](#post-apisignup) - This unit test simulates a POST request to the api/signup path which executes a function to create a user in the database given mock parameters. It checks if the status code of the response is 200 to determine if the request is successful.
- Test 3: [/api/signin](#post-apisignin) - This unit test simulates a POST request to the api/signin path which executes a function to verify if a user is in the database given mock parameters and create a cookie if the user exists. It checks if the status code of the response is 200 to determine if the request is successful.
- Test 4: [/api/delete](#delete-apidelete) - This unit test simulates a DELETE request to the api/delete path which executes a function to delete a user in the database given mock parameters. It checks if the status code of the response is 200 to determine if the request is successful.

### Tutorial Tests
- Test 5: [POST /api/tutorials](#post-apitutorials) - This unit test simulates a POST to /api/tutorials with a mock tutorial object to create the tutorial in the database, checking for status code 200 to determine if the request was successful.
- Test 6: [GET /api/tutorials](#get-apitutorials) - This unit test simulates a GET to /api/tutorials to retrieve all the tutorials currently in the database, checking for status code 200 to determine if the request was successful. 
- Test 7: [GET /api/tutorials/id:{id}](#get-apitutorialsidid) - This unit test simulates a GET with an ID variable to /api/tutorials/id:{id} in order to retieve the tutorial object corresponding with that ID, checking for status code 200 to determine if the request was successful.
- Test 8: [PUT /api/tutorials/id:{id}](#put-apitutorialsidid) - This unit test simulates a PUT with an ID variable to /api/tutorials/id:{id} and a mock object in order to edit the tutorial with that ID using the new information, checking for status code 200 to determine if the request was successful.
- Test 9: [DELETE /api/tutorials/id:{id}](#delete-apitutorialsidid) - This unit test simulates a DELETE with an ID variable corresponding with a tutorial already in the database to /api/tutorials/id:{id} in order to delete that tutorial, checking for status code 200 to determine if the request was successful.
- Test 10: [PUT /api/tutorials/id:{id}/up](#put-apitutorialsididup) - This unit test simulates a PUT with an ID variable to /api/tutorials/id:{id}/up in order to increment the score of the tutorial with that ID up, checking for status code 200 to determine if the request was successful.
- Test 11: [PUT /api/tutorials/id:{id}/down](#put-apitutorialsididdown) - This unit test simulates a PUT with an ID variable to /api/tutorials/id:{id}/down in order to increment the score of the tutorial with that ID down, checking for status code 200 to determine if the request was successful.

## API Documentation

### Table of Contents

[Login](#login)

- [Routes](#routes)
  - [POST /api/signup](#post-apisignup)
  - [POST /api/signin](#post-apisignin)
  - [GET /api/get](#get-apiget)
  - [GET /api/user](#get-apiuser)
  - [DELETE /api/delete](#delete-apidelete)
  - [POST /api/logout](#post-apilogout)
  
[Tutorials](#tutorials)

- [Routes](#routes-1)
  - [POST /api/tutorials](#post-apitutorials)
  - [GET /api/tutorials](#get-apitutorials)
  - [GET /api/tutorials/id:{id}](#get-apitutorialsidid)
  - [PUT /api/tutorials/id:{id}](#put-apitutorialsidid)
  - [DELETE /api/tutorials/id:{id}](#delete-apitutorialsidid)
  - [PUT /api/tutorials/id:{id}/up](#put-apitutorialsididup)
  - [PUT /api/tutorials/id:{id}/down](#put-apitutorialsididdown)
  - [GET /api/tutorials/search:{search}](#get-apitutorialssearchsearch)

[Favorites](#favorites)

- [Routes](#routes-2)
  - [GET /api/favorites](#get-apifavorites)
  - [POST /api/favorites/add](#post-apifavoritesadd)
  - [DELETE /api/favorites/remove](#delete-apifavoritesremove)

## Login

Login Information has the following structure:

`email`: The email address of the user, which is unique.

`username`: The username of the user, which is unique.

`password`: The password of the user. This is passed in as plaintext, but stored in the database in a hashed form.

### Routes

#### POST /api/signup

Used to create new user info to be stored in the database.

Accepts: An object containing the new user's `email`, `username`, and `password`.

Returns: An object creating the new user info if storeage was successful, or a corresponding error message if the input was incorrectly formatted or the email or username already exists in the database.

#### POST /api/signin

Used to sign in to an account whose information exists in the database. It creates a JWT so that logins can be kept persistent across sessions.

Accepts: An object with the user's `username` and `password` (unhashed).

Returns: A "success" message if the login was successful. If not, a corresponding error for one of these scenarios:

- If the input was incorrectly formatted.
- If no corresponding username exists in the database.
- If the password does not match the stored password for the given username.
- If JWT creation failed.

#### GET /api/get

Used to get all login information in the current database. This is primarily used for testing.

Returns: An array of User objects containing all existing users and their information (with hashed passwords).

### GET /api/user

Used to get the currently authenticated user's information.

Returns: An object containing the user info, or an error if the user is not authenticated.

### DELETE /api/delete

Used to completely delete a user from the database when provided the correct username and password. This is primarily used for testing.

Accepts: An object with the user's `username` and `password` (unhashed).

Returns: A "success" message if deletion was successful, or an error if the username does not exist, the assword does not match for the given username, or the input was incorrectly formatted.

#### POST /api/logout

Used to logout; removes the token from the current session.

Returns: A "success" message.

## Tutorials

A tutorial has the following structure:

`id`: The unique ID of each post, used to retrieve it. This is randomly assigned at post creation time.

`title`: The post's title.

`location`: The location of the tutorial resource contained in the post. This can be a URL, an ISBN, or something else. This is unique for every post.

`user`: The username of the user posting the post.

`postTime`: The time the tutorial post was created, formatted as a Unix time integer.

`editTime`: The time the tutorial post was last edited, formatted as a Unix time integer, if the post has been edited. Otherwise, this is equal to `postTime`.

`score`: The score this post has based on the number of votes up and down it has received. At post creation time, this should be 0, and should not change if a post is edited.

### Routes

#### POST /api/tutorials

Used to create a new tutorial post in the database.

Accepts: A tutorial object containing the `title`, `location`, and `user` of the tutorial.

Returns: The new post object if the creation was successful, or an error if the object was incorrectly formatted or the `location` was not unique.

#### GET /api/tutorials

Used to get all tutorials currently in the database.

Returns: An object containing all tutorials.

#### GET /api/tutorials/id:{id}

Used to get a single tutorial post with that ID.

Returns: The object matching the ID in the call, or an error if no post exists with that ID.

#### PUT /api/tutorials/id:{id}

Used to change the information of the post with that ID. Only the following should be edited with this call:

`title`
`location`

Accepts: An object containing those two pieces of information.

Returns: The object matching the ID with the new information, or an error if no post exists with that ID, a post already exists with the new `location`, or the object was incorrectly formatted.

#### DELETE /api/tutorials/id:{id}

Used to delete the post with that ID.

Returns: The object that was deleted.

#### PUT /api/tutorials/id:{id}/up

Used to increment the vote score of a tutorial up by 1.

Returns: The object of the tutorial whose score was incremented.

#### PUT /api/tutorials/id:{id}/down

Used to increment the vote score of a tutorial down by 1.

Returns: The object of the tutorial whose score was incremented.

#### GET /api/tutorials/search:{search}

Used to get an object containing all tutorials whose `title`s contain the string in `search`.

The `search` string in the API call must be a percent-encoded string with spaces represented as '+' and other special characters represented as "%" followed by their ASCII value.

Returns: An object containing all tutorials with `title`s containing the string.

## Favorites

A favorite tutorial has the following structure:

`username`: The user associated with the favorite.

`tutorialid`: The ID of the tutorial associated with the favorite.

### Routes

#### GET /api/favorites

Used to get all of the current user's favorites.

Returns: An object containing all of the current user's favorites, or an error if the user is not currently authenticated.

#### POST /api/favorites/add

Used to add a new favorite tutorial for the current user.

Accepts: The ID of a tutorial that is to be favorited.

Returns: A success message if the post succeeded, or an error if the user is not currently authenticated or if the request body was incorrectly formatted.

#### DELETE /api/favorites/remove

Used to remove a favorite tutorial from the current user

Accepts: The ID of a tutorial that is to be removed from the user's favorites.

Returns: A success message if the removal succeeded, or an error if the user is not currently authenticated or if the request body was incorrectly formatted.




