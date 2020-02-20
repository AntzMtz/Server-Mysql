const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const msySqlstore = require('express-mysql-session');
const { database } = require('./keys')

// para matar todos los nodos: killall node
//inicializar
const app = express();


//Configuraciones
app.set('port', process.env.PORT || 5000)
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

//middlewares
app.use(session({
    secret: 'AntzMySql',
    resave: false,
    saveUninitialized: false,
    store: new msySqlstore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




//Variables Globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
});
//rutas
app.use(require('./routes/index'));
app.use(require('./routes/autentication'));
app.use('/links', require('./routes/links'));
//Publicos
app.use(express.static(path.join(__dirname, 'public')))
    //Start servidor
app.listen(app.get('port'), () => {
    console.log("El servidor corre en el puerto: " + app.get('port'));

})