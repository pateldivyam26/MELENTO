
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Import routes
const assessmentRoutes = require('./routes/assessmentRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const traineeRoutes = require('./routes/traineeRoutes');
const assessmentScoreRoutes = require('./routes/assessmentScoreRoutes');
const authRoutes=require('./routes/authRoutes')


// Use routes
app.use('/assessment', assessmentRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/course_categories', categoryRoutes);
app.use('/cart', cartRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/faculty', facultyRoutes);
app.use('/trainee', traineeRoutes);
app.use('/assessment_score', assessmentScoreRoutes);

const server = app.listen(port, () => console.log(`Server listening on port ${port}!`));