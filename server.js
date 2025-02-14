const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`incoming req: ${req.method} ${req.url}`)
  next();
})
app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);
app.use('/auth', authRoutes);


app.get("/", (req, res) => {
  res.send('hola');
});

app.listen(PORT, () => {
  console.log('START');
})