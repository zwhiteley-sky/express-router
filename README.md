![logo](https://user-images.githubusercontent.com/44912347/202296600-c5f247d6-9616-49db-88f0-38433429d781.jpg)

# Fresh Harvest Fruits Router 🍓

A local farmer has hired you to design and build the routing for a website that will support their growing business: Fresh Harvest Fruits.

They already have their fruit and user data created and want you to create the routes to serve up the data based on the route.

## Part 1: Build the Server and Router

The farmer has tasked you with completing the following to get the server and routes up and running.

**`users.js` Router**

1. In `users.js`, define an Express router for the `users` route. This will handle any requests to the `/users` endpoint.
2. Get all the users in the list of users when using the `GET /users` route.
3. Get a particular user in the list of users when using the `GET /users/:id` route (e.g  `GET /users/2` returns the 2nd user).
4. Create a `POST /users` route that creates a new user in the database.
5. Create a `PUT /users/:id` route that updates the database entry that corresponds to the provided id (e.g. `PUT /users/2` updates the 2nd user).
6. Create a `DELETE /users/:id` route that deletes the database entry that corresponds to the provided id (e.g. `DELETE users/2 deletes the 2nd user).
7. Export the users router, import the router to `server.js`, and setup the the router within your main Express server. 
8. Test your endpoints using Postman.
9. In `index.test.js`, create unit tests for the functionality that you constructed above.

**`fruits.js` Router**

1. In `fruits.js`, define an Express router for the `fruits` route. This will handle any requests to the `/fruits` endpoint.
2. Get all the fruits in the list of fruits when using the `GET /fruits` route.
3. Get a particular fruit in the list of fruits when using the `GET /fruit/:id` route (e.g  `GET /fruits/2` returns the 2nd fruit).
4. Create a `POST /fruit` route that creates a new fruit in the database.
5. Create a `PUT /fruits/:id` route that updates the database entry that corresponds to the provided id (e.g. `PUT /fruits/2` updates the 2nd fruit).
6. Create a `DELETE /fruits/:id` route that deletes the database entry that corresponds to the provided id (e.g. `DELETE fruits/2 deletes the 2nd fruit).
7. Export the fruits router, import the router to `server.js`, and setup the the router within your main Express server. 
8. Test your endpoints using Postman.
9. In `index.test.js`, create unit tests for the functionality that you constructed above.

## Part 2: Express Validator

The farmer is so happy with your work! Apply server-side validation to your API to ensure that: 
- You cannot create a user without a `name`
- You cannot create a fruit without a `color`

1. Run `npm install` to install the necessary dependencies for this assignment.
2. Require the `“express-validator”` package in your users router.
3. Import both the `check` and `validationResult` functions from the Express Validator package.
4. In the `POST` request when creating a `user`, include a parameter in between your endpoint and your callback function. This parameter should check for the “name” field in the request body. The name field in the request body should **NOT BE EMPTY** or be just whitespace.
5. Validate the result of your request object, and store that reference in a variable named `errors`.
6. Create a condition that checks if there are errors caught in the validation result, respond with the JSON which contains: 
    - A key named error
    - A value containing the list of errors caught
    - In any other case, respond with the list of all the users including the newly added user
7. In the `POST` request when creating a `fruit`, include a parameter in between your endpoint and your callback function. This parameter should check for the “color” field in the request body. The color field in the request body should **NOT BE EMPTY** or be just whitespace.
8. Validate the result of your request object, and store that reference in a variable named `errors`.
9. Create a condition that checks if there are errors caught in the validation result, respond with the JSON which contains: 
    - A key named error
    - A value containing the list of errors caught
    - In any other case, respond with the list of all the users including the newly added user
10. Test your endpoints using Postman. Try to add a user without a name or a fruit without a color.
11. In `index.test.js`, create unit tests for the functionality that you constructed above.

## Extension Problems 🚀
1. For the `POST /users` route within the array `[]`, include a second item that checks that the `"age"` in the `request.body` is not empty and doesn’t only contain whitespace.
2. For the `POST /fruits` route within the array `[]`, include a second item that checks that the `"name"` in the request.body is not empty and doesn’t only contain whitespace.
3. Update the `PUT /users/:id` and `PUT fruits/:id` routes with server side validation like you did for the `POST` routes.
4. Within the same `POST /users route`, use Express Validator to check that the value added to the "name" field has a length between 5 and 15 characters.
5. Within the same `POST /fruits` route, use Express Validator to check that the value added to the "name" field has a length between 5 and 20 characters.