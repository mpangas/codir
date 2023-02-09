# Sprint 1 Reflection

## User Stories

-  As a new user on this site, I want to be able to sign up for an account using my personal credentials so I can track my progress and save my favorite tutorials for later.
-  As a returning user on this site, I want to be able to log in to my account using my personal credentials so I can access my saved tutorials and continue where I left off.
- As a new user, I want to be able to easily navigate from the landing page to the sign-up screen so I can quickly create an account and get started.
- As a returning user, I want to be able to easily navigate from the landing page to the sign-in screen so I can quickly log in to my account and continue learning.
- As a user exploring the site, I want to be able to see all relevant pages without creating an account so I can see what content the site has to offer.

## Planned Issues to Address
### Front-end 
- The logo, login button, and sign in button to be implemented on the header of the landing page
- The footer to consist of the link to our Github repository by clicking on the Github logo shown below 
- The login page contains a field to input the username and the password to be able to login to the website
- The sign in page contains a field to input the email to register for the accoumt, a username, and a password
  along with a text that says "already have an account? click here to sign in" to be redirected to the login page.
### Back-end
- Create a database to store user information consisting of email, username, and encrypted password
- HTTP routes based on the CRUD model along with sign-up and sign-in will be implemented to operate on the database.
- Login will be persistent across sessions.
- Allow frontend to send requests to the backend for user information

## Issues Successfully Addressed
### Front-end
- The logo, login button, and the sign in button was successfully implemented on the header of the landing page
- The footer which consists of the Github logo which redirects to our Github repository was successfuly implemented
- The login page and sign up page was sucessfully implemented 
- Information can be inputted in the login and sign in page 
### Back-end
- A MySQL database was created using Microsoft Azure to store user information, which is accessed using the GORM library.
- Routes were implemented to retrieve and delete user info, as well as to create info (sign-up) and check for existence (sign-in).
  - This includes password encryption for security and checking for duplicate information.
  - Also for security, GET requests w=do not retrieve password info.

## Why Some Issues Weren't Addressed
### Front-end
- In attempting to work with the front end and back end progress together, the functionality of the text/link 
"already have an account? click here to sign in." was not implemented and successfully addressed due to our efforts to focus on and fix the essential features of the website and to test if the necessary information
can be sent to the backend. 
### Back-end
- PUT requests for updating user information were not implemented, since layers of security would likely be needed to prevent this functionality being abused, and the essential functionality (sign-up, sign-in, etc.) was prioritized. This functionality is planned to be implemented in the future.
- Login persistence across sessions is being implemented using JWT authentication, but is still in progress.
- Were not able to merge front and backend for this sprint due to time constraints
