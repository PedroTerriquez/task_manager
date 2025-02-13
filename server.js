const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);

app.get("/", (req, res) => {
  res.send('hola');
});

app.listen(PORT, () => {
  console.log('running');
})
