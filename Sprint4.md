# Sprint 4 Documentation

## Frontend - Work Completed
- Created a Preferences Page (a user is directed to this page once signed up) in order to set the interests and the preferences for the tutorials that individual users expect. 
- Created a Recommendations section under the Dashboard Page in order to view the recommended tutorials that share attributes with the preferred tutorials.
- Added more unit test cases that test the existence of buttons from the navigation bar once logged in and checks whether the like and dislike buttons exist within the margins of each card. 
- Redesigned the landing page for enhancing the visual aesthetic of our website by illustrating its functionalities through icons, adding more images, and making additional style changes. 
- Redesigned the Browse page by adding various filters for the user to choose from in order to view the ones that they are interested in. 

## Frontend - Cypress & Unit Tests

### Unit Tests

- Unit Test #1: This test case is just a sample test to test the functionality of unit testing
- Unit Test # 2: Tests to make sure that the logo exists on the header and is properly visible on the website
- Unit Test # 3: Tests to make sure that the login button exists on the header and is properly visible on the website
- Unit Test # 4: Tests to make sure that the sign up button exists on the header and is properly visible on the website
- Unit Test # 5: Tests to make sure that an error message "You must enter a username" is printed when no username is entered when a user tries to login on the login screen.
- Unit Test # 6: Tests to make sure that an error message "You must enter a password" is printed when no password is entered when a user tries to login on the login screen.
- Unit Test # 7: Tests to make sure that an error message "You must enter an email" is printed when no email is entered when a user tries to sign up on the sign up page.
- Unit Test # 8: Tests to make sure that an error message "You must enter an username" is printed when no username is entered when a user tries to sign up on the sign up page.
- Unit Test # 9: Tests to make sure that an error message "You must enter an password" is printed when no password is entered when a user tries to sign up on the sign up page.
- Unit Test # 10: Tests to make sure that an error message "Email address should adhere to this format: example@example.com" is printed when a user tries to sign up with an email that does that not fit the email format/requirements on the sign up page.
- Unit Test # 11: Tests to make sure that an error message "The username must contain only alphanumeric and 6-20 characters." is printed when a user tries to sign up with a username that does not fit the username format/requirements on the sign up page.
- Unit Test # 12: Tests to make sure that an error message "The password should contain 6-20 characters." is printed when a user tries to sign up with a password that does not fit the password format/requirements on the sign up page.
- Unit Test # 13: Tests to make sure that the "Submit Tutorial" button is visible on the Browse Page once the user is logged in. 
- Unit Test # 14: Tests to make sure that the "Dashboard" button exists on the Header Bar once the user is logged in. 
- Unit Test # 15: Tests to make sure that the "Browse" button exists on the Header Bar once the user is logged in. 
- Unit Test # 16: Tests to make sure that the "About Us" button exists on the Header Bar once the user is logged in. 
- Unit Test # 17: Tests to make sure the like button icon is present within the borders/margins of the Card in the Dashboard Page. 
- Unit Test # 18: Tests to make sure the dislike button icon is present within the borders/margins of the Card in the Dashboard Page. 

### Cypress Tests

- Cypress Test #1: Makes sure login button is available and can be clicked on.
- Cypress Test #2: Makes sure the sign up button is available and can be clicked on.
- Cypress Test #3: Ensures that a user can sign up for the website.
- Cypress Test #4: Ensures that logging into the website works.
- Cypress Test #5: Tests to make sure that the website can be logged into and can be navigated to the 'Dashboard' page of our site.
- Cypress Test #6: Tests to make sure that the website can be logged into and can be navigated to the 'Browse' page of our site.
- Cypress Test #7: Tests to make sure that the website can be logged into and can be navigated to the 'About Us' page of our site.
- Cypress Test #8: Ensures that the ‘Submit Tutorial’ button in the Browse page works and shows the correct information when clicked on.
- Cypress Test #9: Ensures that the necessary options are present when clicked on the “All Languages” drop down menu on the Browse page which displays a list of         programming languages.
- Cypress Test #10: Ensures that the necessary options are present when clicked on the “All Technologies” drop down menu on the Browse page which displays a list of     technologies.
- Cypress Test #11: Ensures that the necessary options are present when clicked on the “All Skill Levels” drop down menu on the Browse page which displays a list of     skill levels.
- Cypress Test #12: Ensures that the necessary options are present when clicked on the “All Learning Styles” drop down menu on the Browse page which displays a list of   different learning styles.
- Cypress Test #13: Ensures that when the submit button is clicked on the Preferences Page, the website is redirected to the Dashboard page.
- Cypress Test #14: Ensures that the hyperlink with the text “Browse” on the Dashboard page redirects to the Browse Page.
- Cypress Test #15: Ensures that the hyperlink with the text “Preferences” on the Dashboard page redirects to the Preferences Page.
- Cypress Test #16: Ensures that when a user signs up for an account, they are redirected to the Preferences Page.


## Backend - Work Completed
- Added a Preferences model and established a one-to-one relationship between User and Preferences. Configured this model to include different properties that a user would be associated with a user's profile.
- Added a Attributes model and established a one-to-one relationship between Tutorial and Attributes. Configured this model to include different attributes that a tutorial would have upon creation.
- Added functions for preferences to retrieve and update the objects for a given user
- Added functions for attributes to retrieve and update the objects for a given tutorial
- Developed a recommendation algorithm that returns tutorials for a user based on their chosen preferences
- Created additional unit tests to evaluate the effectiveness of added functionality

## Backend - Unit Tests
### User Tests
- Test 1: [/api/get](#get-apiget) - This unit test simulates a GET request to the api/get path which executes a function to return the information for all users in the database. It checks if the status code of the response is 200 to determine if the request is successful.
- Test 2: [/api/signup](#post-apisignup) - This unit test simulates a POST request to the api/signup path which executes a function to create a user in the database given mock parameters. It checks if the status code of the response is 200 to determine if the request is successful.
- Test 3: [/api/signin](#post-apisignin) - This unit test simulates a POST request to the api/signin path which executes a function to verify if a user is in the database given mock parameters and create a cookie if the user exists. It checks if the status code of the response is 200 to determine if the request is successful.
- Test 4: [/api/delete](#delete-apidelete) - This unit test simulates a DELETE request to the api/delete path which executes a function to delete a user in the database given mock parameters. It checks if the status code of the response is 200 to determine if the request is successful.
- Test 5: [GET /api/preferences](#get-apipreferences) - This unit test sends a GET request to retrieve the Preferences object associated with the user and all of its attributes. It does this by creating a mock JWT token and requesting the bearer's preferences.
- Test 6: [PUT /api/preferences](#put-apipreferences) - This unit test sends a PUT request to update the Preferences object associated with the user with the provided attributes. It does this by creating a mock JWT token and updating the bearer's preferences.

### Tutorial Tests
- Test 7: [POST /api/tutorials](#post-apitutorials) - This unit test simulates a POST to /api/tutorials with a mock tutorial object to create the tutorial in the database, checking for status code 200 to determine if the request was successful.
- Test 8: [GET /api/tutorials](#get-apitutorials) - This unit test simulates a GET to /api/tutorials to retrieve all the tutorials currently in the database, checking for status code 200 to determine if the request was successful. 
- Test 9: [GET /api/tutorials/id:{id}](#get-apitutorialsidid) - This unit test simulates a GET with an ID variable to /api/tutorials/id:{id} in order to retieve the tutorial object corresponding with that ID, checking for status code 200 to determine if the request was successful.
- Test 10: [PUT /api/tutorials/id:{id}](#put-apitutorialsidid) - This unit test simulates a PUT with an ID variable to /api/tutorials/id:{id} and a mock object in order to edit the tutorial with that ID using the new information, checking for status code 200 to determine if the request was successful.
- Test 11: [DELETE /api/tutorials/id:{id}](#delete-apitutorialsidid) - This unit test simulates a DELETE with an ID variable corresponding with a tutorial already in the database to /api/tutorials/id:{id} in order to delete that tutorial, checking for status code 200 to determine if the request was successful.
- Test 12: [PUT /api/tutorials/id:{id}/up](#put-apitutorialsididup) - This unit test simulates a PUT with an ID variable to /api/tutorials/id:{id}/up in order to increment the score of the tutorial with that ID up, checking for status code 200 to determine if the request was successful.
- Test 13: [PUT /api/tutorials/id:{id}/down](#put-apitutorialsididdown) - This unit test simulates a PUT with an ID variable to /api/tutorials/id:{id}/down in order to increment the score of the tutorial with that ID down, checking for status code 200 to determine if the request was successful.
- Test 14: [GET /api/tutorials/attributes](#get-apitutorialsattributes) - This unit test simualtes a GET request to retrieve all Attributes objects stored in the database.
- Test 15 [GET /api/tutorials/recommend](#get-apitutorialsrecommend) - This unit test sends a GET request to retrieve all recommendations for the authenticated user. It is given a mock JWT token and generates recommendation based on that user's preferences and all existing tutorials.

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
  - [GET /api/tutorials/recommend](#get-apitutorialsrecommend)

- [Attribute Routes](#attributes-routes)
  - [GET /api/tutorials/attributes](#get-apitutorialsattributes)
  - [GET /api/tutorials/attributes/id::id](#get-apitutorialsattributesidid)
  - [PUT /api/tutorials/attributes/id::id](#put-apitutorialsattributesidid)

[Favorites](#favorites)

- [Routes](#routes-2)
  - [GET /api/favorites](#get-apifavorites)
  - [POST /api/favorites/add](#post-apifavoritesadd)
  - [DELETE /api/favorites/remove](#delete-apifavoritesremove)

[Preferences](#preferences)

- [Routes](#routes-3)
  - [GET /api/preferences](#get-apipreferences)
  - [PUT /api/favorites/add](#put-apipreferences)

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

Accepts: A tutorial object containing the `title`, `location`, and `user` of the tutorial, along with the `attributes` containing the `skillLevel`, `language`, `technology`, and `style` (see below).

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

#### GET /api/tutorials/recommend

Used to get recommended tutorials based on the preferences set by the current user. Because of this, the user has to be authenticated to use this.

Returns: An object of 5 or less tutorials matching the preferences of the current user. An error will be returned if the user is not yet authenticated.

### Attributes Routes

Currently, attributes need to be edited and retrieved separately of the tutorials they describe. An `attributes` object must contain the following:

`skillLevel`: 'Beginner', 'Intermediate', 'Advanced'

`language`: 'Assembly', 'Bash/Shell', 'C', 'C#', 'C++', etc.

`technology`: '.NET', 'Angular', 'Angular.js', 'Ansible', 'ASP.NET', etc.

`style`: 'Text Tutorials', 'Video Tutorials', 'Interactive Tutorials'

The 5th value, `tutID`, matches the ID of the tutorial being described; this is assigned automatically.

#### GET /api/tutorials/attributes

Used to get all attributes currently in the database.

Returns: an object containing all attributes.

#### GET /api/tutorials/attributes/id::id

Used to get a single `attributes` matching the ID given in the API call.

Returns: an object containing the attributes matching the ID, or an error if none exists.

#### PUT /api/tutorials/attributes/id::id

Used to edit an attributes object matching the ID given in the API call.

Accepts: An object describing the `skillLevel`, `language`, `technology`, and `style` that the new object is to have (see above).

Returns: The object that was edited, or an error if no object exists with that ID or the input was formatted incorrectly.

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

## Preferences

### Routes

#### GET /api/preferences

Used to retreive the Preferences object attached with the currently authenticated user

Returns: An object with each property of hte Preferences model

#### PUT /api/preferences

Used to update the Preferences object attached to the currently authetnicated user

Accepts: A Preferences model object that contains each attribute associated with the model

Returns: A success message if the operation is successful or an error otherwise.
