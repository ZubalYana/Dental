const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');
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

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../dist/index.html'));
// });

const emailSchema = new mongoose.Schema({
    email: String
})

const Email = mongoose.model('Email', emailSchema)
app.post('/send', (req, res) => {
    const { email } = req.body
    console.log(email)
    res.send('ok')

    const newEmail = new Email({
        email
    })
    newEmail.save()
})

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});