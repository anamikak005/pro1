const express=require('express');
const connectDB=require('./config/db');
const path = require('path');
const app=express();
const session = require('express-session');
const exphbs  = require('express-handlebars');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(bodyParser.urlencoded({extended:true}));
//connect to database
connectDB();
app.use(express.json({extended: false}));
//Define routes
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();

});
app.use('/',require('./routes/index'));
app.get('/home', (req, res) => {

  const htmlPath = path.join(url-shortner, 'public', 'index.html');
  res.sendFile(htmlPath)
});
app.get('/show', (req, res) => {

  res.render('show');
});
app.use('/api/url',require('./routes/url'));

var PORT = process.env.PORT || 5110;

app.listen(PORT, () =>{
  console.log(`Server started on port ${PORT}`);
});
