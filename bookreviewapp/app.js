require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3000;

// Session configuration (MUST come before flash)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-here',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Flash messages (requires sessions)
app.use(flash());

// Method override
app.use(methodOverride('_method'));

// Other middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
const booksRouter = require('./routes/books');
const reviewsRouter = require('./routes/reviews');
app.use('/books', booksRouter);
app.use('/books/:bookId/reviews', reviewsRouter);

// Redirects
app.get('/', (req, res) => res.redirect('/books'));
app.get('/:id', (req, res, next) => {
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(req.params.id)) {
    return res.redirect(`/books/${req.params.id}`);
  }
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.status || 500;
  const errorResponse = {
    message: err.message || 'Something went wrong!',
    status: statusCode
  };
  
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).render('error', {
    message: errorResponse.message,
    status: errorResponse.status,
    error: process.env.NODE_ENV === 'development' ? errorResponse : null,
    env: process.env.NODE_ENV || 'development'
  });
});
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Add after session middleware
app.use(passport.initialize());
app.use(passport.session());

// Basic local strategy example
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Add your user authentication logic here
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (user.password !== password) return done(null, false);
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));