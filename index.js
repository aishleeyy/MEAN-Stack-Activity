const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');

const app = express();
const port = 3000;

const uri = 'mongodb://localhost:27017/';
const dbName = 'MyDb';
const collectionName = 'Books';

let db;
let booksCollection;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage });

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    booksCollection = db.collection(collectionName);
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/books', async (req, res) => {
  try {
    const books = await booksCollection.find({}).toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const book = await booksCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/books', async (req, res) => {
  try {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      genre: req.body.genre,
      description: req.body.description
    };
    const result = await booksCollection.insertOne(newBook);
    res.status(201).json({ message: 'Book added successfully', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = {
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      genre: req.body.genre,
      description: req.body.description
    };
    const result = await booksCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedBook }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const result = await booksCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});