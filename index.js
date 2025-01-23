const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3010;


app.use(bodyParser.json());


const students = Array.from({ length: 100 }, (_, i) => ({
  name: `Student${i + 1}`,
  total: (i * 10) % 501
}));


app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  if (threshold === undefined || typeof threshold !== 'number' || threshold < 0) {
    return res.status(400).json({ error: "'threshold' must be a positive number." });
  }

  const filteredStudents = students.filter(student => student.total > threshold);

  
  res.json({
    count: filteredStudents.length,
    students: filteredStudents
  });
});


app.use(express.static('static'));

app.get('/', (req, res) => {
  res.send("Server is running!");
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
