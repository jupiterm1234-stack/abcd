// Import express framework
const express = require('express');

// Create an express application
const app = express();

// Define the port number
const PORT = 3000;

// ROUTE 1: Home page
// When user visits http://localhost:3000/
app.get('/', (req, res) => {

    // req = request from user
    // res = response we send back

    res.send('<h1>Welcome to Node Server!</h1>');
});

// ROUTE 2: About page
// When user visits http://localhost:3000/about
app.get('/about', (req, res) => {

    res.send('<h1>About Us</h1><p>We are learning Node.js!</p>');

});

// ROUTE 3: API endpoint returning JSON
// When user visits http://localhost:3000/api/users
app.get('/api/users', (req, res) => {

    // Create sample data
    const users = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 28 }
    ];

    // Send JSON response
    res.json(users);

});

// ROUTE 4: Dynamic route with parameter
// When user visits http://localhost:3000/user/5
app.get('/user/:id', (req, res) => {

    // Get the id from URL
    const userId = req.params.id;

    res.send(`<h1>User ID: ${userId}</h1>`);

});

// Start the server
app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});