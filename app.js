const express = require('express');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const port = process.env.PORT || 4000;

app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log('server is running');
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Routes
// app.get('/', (req, res) => {
//   res.sendFile('./views/index.html', { root: __dirname });
// });

// app.get('/about', (req, res) => {
//   res.sendFile('./views/about.html', { root: __dirname });
// });

// VIEWS
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About' });
});

// Blog Routes
app.use('/blogs', blogRoutes);

// 404
app.use((req, res) => {
  res.status(404).render('404', { pageTitle: '404' });
});

// Redirect
// app.get('/about-us', (req, res) => {
//   res.redirect('/about');
// });

// 404
// app.use((req, res) => {
//   res.status(404).sendFile('./views/404.html', { root: __dirname });
// });
