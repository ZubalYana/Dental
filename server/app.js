const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';
const mongoose = require('mongoose');
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

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

app.post('/send', (req, res) => {
    const { email } = req.body
    console.log(email)
    res.send('ok')

    const newEmail = new Email({
        email
    })
    newEmail.save()
})
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


app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});