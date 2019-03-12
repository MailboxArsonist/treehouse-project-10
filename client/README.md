#Treehouse-Project-10

Welcome to my final treehouse project, this is a full-stack MERN app where users can create an account, create, update and delete courses.

note for person reviewing my project.
 -user logins reference for testing "sally@jones.com sallypassword" "joe@smith.com joepassword"
 -I think I should be good to go for exceeds here. All of my error routing seems to be working fine.
 -Ive added the user info to a cookie which is used if needed, also cleared out on 'signout' method
 -Note: Instead of posting to the db on the update createcourse routes and waiting/reading the validation messages from the backend, I've validated on the front-end instead to limit un-necessary api calls.

Steps to run this application

1. Run mongo to start the db

2. In both the api and client folder run 'npm install' to install dependencies

3. In the terminal you can run 'npm run seed' to seed the db (API folder)

4. Still in the npm folder you can start the server with 'npm start'

5. In the client folder you can 'npm start' to start the application.

6. In your browser navigate to 'http://localhost:3000/' to use the application.