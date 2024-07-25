const express = require('express');
const router = express.Router();
const { Book } = require('../models');


router.get('/', async (req, res) => {
  const books = await Book.findAll();
  res.render('index', { books });
});


router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/create', async (req, res) => {
  await Book.create(req.body);
  res.redirect('/books');
});


router.get('/edit/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('edit', { book });
});


router.post('/edit/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.redirect('/books');
});

router.post('/delete/:id', async (req, res) => {
  await Book.destroy({ where: { id: req.params.id } });
  res.redirect('/books');
});

module.exports = router;
