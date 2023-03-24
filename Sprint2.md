# Sprint 2 Documentation

## Frontend - Work Completed
- Designed the landing page of the website.
- Created the login button and login page allowing the user to login to our website.
- Created the sign up button and sign up page allowing the user to sign up for our website.
- Designed the dashboard page of the our website which allows the user to view favorited tutorials. The functionality has not been implemented yet. 
- Designed the about us page which includes a brief summary of what Codir is about as well as the names of the contributors. 
- Integrated the signin and signup to work with the backend.

## Frontend - Cypress Unit Tests
- Test 1 - 'Login' - This unit test checks that the login button is functional and redirects the user to the login page for them to log in to the website.
- Test 2 - 'Sign up' - This unit test checks that the sign up button is functional and redirects the user to the sign up page for them to sign up for the website.
- Test 3 - 'Sign up testing submit' - This unit test inputs a sample email, username, and password on the sign up page to ensure that signing up for the website is functional and succeeds which is shown by the website redirecting to the login page immediately after sign up. 

## Backend - Work Completed
- Migrated backend to use the Go Fiber framework due to fetch issues.
- Setup environmental variables in a locally stored .env file to allow for database password securiy and ease of use
- Restructured files to include seperate controller folders for login and posts, as well as seperate files for the database connection and models.
- Created tutorial post infrastructure, including routes and controller functions
- Created several unit tests using Go's stdlib testing package that test the functionality of different API routes, as shown below

## Backend - Go Unit Tests
- Test 1: [api/get](#get-apiget) - This unit test simulates a GET request to the api/get path which executes a function to return the information for all users in the database. It checks if the status code of the response is 200 to determine if the request is successful.
- Test 2: [api/signup](#post-apisignup) - This unit test simulates a POST request to the api/signup path which executes a function to create a user in the database given mock parameters. It checks if the status code of the response is 200 to determine if the request is successful.
- Test 3: [api/signin](#post-apisignin) - This unit test simulates a POST request to the api/signin path which executes a function to verify if a user is in the database given mock parameters and create a cookie if the user exists. It checks if the status code of the response is 200 to determine if the request is successful.
- Test 4: [api/delete](#delete-apidelete) - This unit test simulates a DELETE request to the api/delete path which executes a function to delete a user in the database given mock parameters. It checks if the status code of the response is 200 to determine if the request is successful.

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
  - [GET /api/tutorials/id:{id}](#get-apitutorialsid)
  - [PUT /api/tutorials/id:{id}](#put-apitutorialsid)
  - [DELETE /api/tutorials/id:{id}](#delete-apitutorialsid)

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

#### GET /api/tutorials/:id

Used to get a single tutorial post with that ID.

Returns: The object matching the ID in the call, or an error if no post exists with that ID.

#### PUT /api/tutorials/:id

Used to change the information of the post with that ID. Only the following should be edited with this call:

`title`
`location`

Accepts: An object containing those two pieces of information.

Returns: The object matching the ID with the new information, or an error if no post exists with that ID, a post already exists with the new `location`, or the object was incorrectly formatted.

#### DELETE /api/tutorials/:id

Used to delete the post with that ID.

Returns: WIP
