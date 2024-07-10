const express = require('express')
const assessment_controller = require('./controllers/assessment')
const user_controller = require('./controllers/user')
const course_controller = require('./controllers/course')
const category_controller = require('./controllers/category')
const cart_controller = require('./controllers/cart')
const attendance_controller = require('./controllers/attendance')
const faculty_controller = require('./controllers/faculty')
const trainee_controller = require('./controllers/trainee')
const score_controller = require('./controllers/assessmentScore')
const port = process.env.PORT || 3000
const app = express()
const cors = require("cors")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const server = app.listen(port, () => console.log(`Server listening on port ${port}!`))

//Assessment
app.get('/assessment', (req, res) => {
    assessment_controller.getAssessment(req, res)
})

app.get('/assessment/:id', (req, res) => {
    assessment_controller.getAssessmentById(req, res);
});

app.post('/assessment', (req, res) => {
    assessment_controller.addAssessment(req, res)
})

app.put('/assessment/:id', (req, res) => {
    assessment_controller.updateAssessment(req, res)
})

app.delete('/assessment/:id', (req, res) => {
    assessment_controller.deleteAssessment(req, res)
})

//Users
app.get('/users', (req, res) => {
    user_controller.getUser(req, res)
})

app.get('/users/:id', (req, res) => {
    user_controller.getUserById(req, res);
});

app.post('/users', (req, res) => {
    user_controller.addUser(req, res)
})

app.put('/users/:id', (req, res) => {
    user_controller.updateUser(req, res)
})

app.delete('/users/:id', (req, res) => {
    user_controller.deleteUser(req, res)
})

//Courses
app.get('/courses', (req, res) => {
    course_controller.getCourse(req, res)
})

app.get('/courses/:id', (req, res) => {
    course_controller.getCourseById(req, res);
});

app.post('/courses', (req, res) => {
    course_controller.addCourse(req, res)
})

app.put('/courses/:id', (req, res) => {
    course_controller.updateCourse(req, res)
})

app.delete('/courses/:id', (req, res) => {
    course_controller.deleteCourse(req, res)
})

//Course Categories
app.get('/course_categories', (req, res) => {
    category_controller.getCategory(req, res)
})

app.get('/course_categories/:id', (req, res) => {
    category_controller.getCategoryById(req, res);
});

app.post('/course_categories', (req, res) => {
    category_controller.addCategory(req, res)
})

app.put('/course_categories/:id', (req, res) => {
    category_controller.updateCategory(req, res)
})

app.delete('/course_categories/:id', (req, res) => {
    category_controller.deleteCategory(req, res)
})

//Cart
app.get('/cart', (req, res) => {
    cart_controller.getCart(req, res)
})

app.get('/cart/:id', (req, res) => {
    cart_controller.getCartById(req, res);
});

app.post('/cart', (req, res) => {
    cart_controller.addCart(req, res)
})

app.put('/cart/:id', (req, res) => {
    cart_controller.updateCart(req, res)
})

app.delete('/cart/:id', (req, res) => {
    cart_controller.deleteCart(req, res)
})

//Attendance
app.get('/attendance', (req, res) => {
    attendance_controller.getAttendance(req, res)
})

app.get('/attendance/:id', (req, res) => {
    attendance_controller.getAttendanceById(req, res);
});

app.post('/attendance', (req, res) => {
    attendance_controller.addAttendance(req, res)
})

app.put('/attendance/:id', (req, res) => {
    attendance_controller.updateAttendance(req, res)
})

app.delete('/attendance/:id', (req, res) => {
    attendance_controller.deleteAttendance(req, res)
})

//Faculty
app.get('/faculty', (req, res) => {
    faculty_controller.getFaculty(req, res)
})

app.get('/faculty/:id', (req, res) => {
    faculty_controller.getFacultyById(req, res);
});

app.post('/faculty', (req, res) => {
    faculty_controller.addFaculty(req, res)
})

app.put('/faculty/:id', (req, res) => {
    faculty_controller.updateFaculty(req, res)
})

app.delete('/faculty/:id', (req, res) => {
    faculty_controller.deleteFaculty(req, res)
})

//Trainee
app.get('/trainee', (req, res) => {
    trainee_controller.getTrainee(req, res)
})

app.get('/trainee/:id', (req, res) => {
    trainee_controller.getTraineeById(req, res);
});

app.post('/trainee', (req, res) => {
    trainee_controller.addTrainee(req, res)
})

app.put('/trainee/:id', (req, res) => {
    trainee_controller.updateTrainee(req, res)
})

app.delete('/trainee/:id', (req, res) => {
    trainee_controller.deleteTrainee(req, res)
})

//Assessment Score
app.get('/assessment_score', (req, res) => {
    score_controller.getScore(req, res)
})

app.get('/assessment_score/:id', (req, res) => {
    score_controller.getScoreById(req, res);
});

app.post('/assessment_score', (req, res) => {
    score_controller.addScore(req, res)
})

app.put('/assessment_score/:id', (req, res) => {
    score_controller.updateScore(req, res)
})

app.delete('/assessment_score/:id', (req, res) => {
    score_controller.deleteScore(req, res)
})
