const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

const { createServer } = require('http');
const { initSocketServer } = require('./socket_io_server.js');

const httpServer = createServer(app);
const io = initSocketServer(httpServer);

app.use(cors({origin: "*", credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
