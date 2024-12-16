const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://zubalana0:bJJnl1be8qubMUQE@cluster0.xab5e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('DB connected')
})
.catch(err => {
    console.log(err)
})
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));


//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed'));
        }
        cb(null, true);
    },
});


//mongoose schemas
const emailSchema = new mongoose.Schema({
    email: String
})
const Email = mongoose.model('Email', emailSchema)
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = mongoose.model('User', userSchema)
const Feedback = mongoose.model('Feedback', {
    name: String,
    feedback: String,
    rating: Number,
    accepted: { type: Boolean, default: false },
})
const doctorSchema = new mongoose.Schema({
    name: String,
    image: String,
    specialty: String
})
const Doctor = mongoose.model('Doctor', doctorSchema)
const appointmentSchema = new mongoose.Schema({
    name: String,
    gender: String,
    phone: String,
    email: String,
    department: String,
    date: Date,
    details: String,
  });
const Appointment = mongoose.model('Appointment', appointmentSchema);

//auth
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!password) {
        return res.status(400).send('Password is required');
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.send('User registered successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send('Invalid password');
        }
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during login');
    }
});

//nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
});
app.post('/api/send-newsletter', async (req, res) => {
    console.log('Request body:', req.body);
  
    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Newsletter content is required.' });
    }
  
    try {
      const emails = await Email.find({});
      console.log('Emails:', emails);
  
      if (!emails.length) {
        return res.status(404).json({ error: 'No subscribers found.' });
      }
  
      const promises = emails.map((emailDoc) => {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: emailDoc.email,
          subject: 'Your Newsletter',
          html: content,
        };
        return transporter.sendMail(mailOptions);
      });
  
      await Promise.all(promises);
      res.status(200).json({ message: 'Newsletter sent successfully to all subscribers.' });
    } catch (error) {
      console.error('Error sending newsletter:', error);
      res.status(500).json({ error: 'An internal server error occurred.' });
    }
});
//newsLetter sending
app.post('/send', (req, res) => {
    const { email } = req.body
    console.log(email)
    res.send('ok')

    const newEmail = new Email({
        email
    })
    newEmail.save()
})

//feedback sending
app.post('/feedback', (req, res) => {
    console.log(req.body);
    const feedback = new Feedback(req.body);
    feedback.save().then(() => {
        console.log('Feedback saved');
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});
//get all the feedbacks
app.get('/api/feedbacks', async (req, res) => {
    try {
        const feedbacks = await Feedback.find(); 
        res.status(200).json(feedbacks); 
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).json({ error: 'Failed to fetch feedbacks' });
    }
});
//reject feedback
app.delete('/api/feedbacks/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const result = await Feedback.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ error: 'Failed to delete feedback' });
    }
});
//accept feedback
app.put('/api/feedbacks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        feedback.accepted = true;
        await feedback.save();
        res.status(200).json({ message: 'Feedback accepted successfully' });
    } catch (error) {
        console.error('Error accepting feedback:', error);
        res.status(500).json({ error: 'Failed to accept feedback' });
    }
});

//get all the users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users); 
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
//delete user 
app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const result = await User.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

//register a doctor
app.post('/api/registerDoctor', upload.single('image'), async (req, res) => {
    try {
        const { name, specialty } = req.body;
        const image = req.file;
        if (!name || !specialty || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const doctor = new Doctor({ 
            name, 
            specialty, 
            image: image.path 
        });
        await doctor.save();
        res.status(200).json({ message: 'Doctor registered successfully' });
    } catch (error) {
        console.error('Error registering doctor:', error);
        res.status(500).json({ error: 'Failed to register doctor' });
    }
});

//get all the doctors
app.get('/api/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find(); 
        res.status(200).json(doctors); 
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Failed to fetch doctors' });
    }
});

//create an appointment
app.post('/api/appointments', async (req, res) => {
    try {
      const appointment = new Appointment(req.body);
      await appointment.save();
      res.status(201).send('Appointment saved successfully');
    } catch (error) {
      res.status(500).send('Error saving appointment');
    }
});
app.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find(); 
        res.status(200).json(appointments); 
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});
app.delete('/api/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const result = await Appointment.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
});

//basic endpoints
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/admin.html'));
});
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});