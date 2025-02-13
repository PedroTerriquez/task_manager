const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const taskRoutes = require('./routes/taskRoutes');

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);

app.get("/", (req, res) => {
  res.send('hola');
});

app.listen(PORT, () => {
  console.log('running');
})
