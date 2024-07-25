const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const bookRoutes = require('./routes/books');


app.get('/', (req, res) => {
  res.redirect('/books');
});


app.use('/books', bookRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
