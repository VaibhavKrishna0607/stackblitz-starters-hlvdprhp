const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3010;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Read student data from data.json
const dataPath = path.join(__dirname, 'data.json');
let students = [];

fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading data.json:', err);
        return;
    }
    students = JSON.parse(data);
});

app.post('/students/above-threshold', (req, res) => {
    const threshold = req.body.threshold;

    if (typeof threshold !== 'number') {
        return res.status(400).json({ error: 'Invalid threshold value. Please provide a number.' });
    }

    const studentsAboveThreshold = students.filter(student => student.total > threshold);
    const result = {
        count: studentsAboveThreshold.length,
        students: studentsAboveThreshold.map(student => ({
            name: student.name,
            total: student.total
        }))
    };

    res.json(result);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
