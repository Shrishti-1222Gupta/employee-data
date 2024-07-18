const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection   
mongoose.connect('mongodb+srv://shrishtigupta1102:<password>@cluster0.h019uoi.mongodb.net/')
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB', err);
});

// Employee Schema
const employeeSchema = new mongoose.Schema({
    FName: { type: String, required: true },
    LName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
});

// Employee Model
const Employee = mongoose.model('Employee', employeeSchema);

// API Endpoints



app.post('/employees', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(200).send('Employee added successfully');
    } catch (err) {
        res.status(500).send(err);
    }
});
app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});