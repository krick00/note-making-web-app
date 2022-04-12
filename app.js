const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Note = require('./modals/note');
const { render } = require('ejs');
const app = express();

let port = process.env.PORT;
if (port == null || port =="") {
    port = 3000;
}



const dbURI = "mongodb+srv://gotohell123:gotohell123@cluster0.osdqx.mongodb.net/notemaker?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then((result) => app.listen(port))
   .catch((err) => console.log(err));

app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));


 

app.get('/', (req, res) => {
    res.redirect('/notes');
});
app.get('/notes', (req, res) => {
    Note.find()
    .then((result) => {
        res.render('index', {notes: result})
    })
    .catch((err) => {
        console.log(err);
    })
});
app.post('/notes', (req, res) => {
    const note = new Note(req.body);

    note.save()
    .then((result) => {
        res.redirect('/notes');
    })
    .catch((err) => {
        console.log(err);
    })
});

app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    Note.findById(id)
    .then(result => {
        res.render('details', {note: result});
    })
    .catch(err  => {
        console.log(err)
    })
});
app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/create', (req, res) => {
    res.render('create');
});