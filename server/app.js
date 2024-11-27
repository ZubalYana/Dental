const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
mongoose.connect('mongodb+srv://zubalana0:bJJnl1be8qubMUQE@cluster0.xab5e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('DB connected')
})
.catch(err => {
    console.log(err)
})
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());



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
        user: 'yanazubal2345@gmail.com',
        pass: 'ioil iqsl jwbr skqn'
    }
});
//newsLetter sending
app.post('/send-newsletter', async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).send('Content is required');
    }
    try {
        const subscribers = await Subscriber.find({});
        if (!subscribers.length) {
            return res.status(404).send('No subscribers found');
        }
        for (const subscriber of subscribers) {
            const mailOptions = {
                from: 'yanazubal2345@gmail.com', 
                to: subscriber.email, 
                subject: 'Your Newsletter',
                html: content 
            };
            await transporter.sendMail(mailOptions);
            console.log(`Newsletter sent to ${subscriber.email}`);
        }
        res.status(200).send('Newsletter sent successfully to all subscribers');
    } catch (error) {
        console.error('Error sending newsletter:', error);
        res.status(500).send('Error sending newsletter');
    }
});

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

        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        await feedback.remove();
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