// Import express framework 
const express = require('express');
const mongoose = require('mongoose');

// Create express app 
const app = express(); 

// Allow JSON data in requests 
app.use(express.json()); 

// Connect to MongoDB (local database named 'workshop ') 
mongoose.connect('mongodb://localhost:27017/workshop ') 
.then(() => console.log('MongoDB Connected!')) // Success 
.catch(err => console.log('Error:', err)); // Failure 

// Define Schema - what data looks like 
const studentSchema = new mongoose.Schema({ 
  name: String , // Student name 
  age: Number , // Student age 
  course: String // Course enrolled 
}); 

// Create Model from Schema 
const Student = mongoose.model('Student ', studentSchema); 

// CREATE - Add new student 
app.post('/students', async (req, res) => { 
  // Create student from request body 
  const student = new Student(req.body); 
  // Save to database 
  await student.save(); 
  // Send response 
  res.json({ message: 'Student added!', student });
});

// READ - Get all students 
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// UPDATE - Change student by ID 
app.put('/students/:id', async (req, res) => {
  // Find by ID and update
  const student = await Student.findByIdAndUpdate(
    req.params.id, // ID from URL
    req.body, // New data
    { new: true } // Return updated doc
  );
  res.json({ message: 'Updated!', student });
});

// DELETE - Remove student by ID 
app.delete('/students/:id', async (req, res) => {
  // Find by ID and delete
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted!' });
});

// Start server on port 3000 
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000'); 
});
