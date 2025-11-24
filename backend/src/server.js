require ('dotenv').config();
const express = require('express');
const cors = require('cors');

// initialize app
const app = express();

app.use(express.json());

// allowed origins
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS,
    credentials: true
}));

// connect DB
if(process.env.NODE_ENV !== "test"){
    const connectDB = require('./config/db')
    connectDB();
}

// import routes
const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)

const taskRoutes = require('./routes/taskRoutes')
app.use('/api/tasks', taskRoutes)

const projectRoutes = require('./routes/projectRoutes')
app.use('/api/projects', projectRoutes)

// base route
app.get('/', (req,res) => {
    res.send('Server up and running')
})

// listen
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = app;