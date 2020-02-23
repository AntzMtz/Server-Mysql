const pastport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const poll = require('../database');
const helpers = require('../lib/helpers')

const bcry = require('bcryptjs');


pastport.use('local.signin',new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
},async(req,usuario,password,done)=>{
    console.log(req.body);
    const row = await poll.query('select * from Usuarios where idUser = ?', [usuario]);
    console.log("lengt: "+row.length);

    if(row.length>0){
        const usuari1 = row[0].Nombre;
        const user = row[0];
        const vali=await helpers.matchPassword(password,user.Password);
        console.log(vali);
        if(vali){
            console.log("Inicio correcto: "+ user.Nombre);
            return done(null,user);
        }else{
            done(null,false,req.flash('message','password incorrecto'));
        }
        
    }else{
        return done(null,false,req.flash('message','Usuario no existe'))
    }
}));


pastport.use('local.signup', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, usuario, password, done) => {
    console.log(req.body);
    const { fullName } = req.body;
    const newUser = {

        idUser: usuario,
        Nombre: fullName,
        Password: password
    };
    newUser.Password = await helpers.encypass(password);
    const result = await poll.query('INSERT INTO Usuarios set ?', [newUser])
    console.log(result);
    return done(null, newUser);

}));

pastport.serializeUser((user, done) => {
    done(null, user.idUser)
});

pastport.deserializeUser(async (idUser, done) => {
    const rows = await poll.query('select * from Usuarios where idUser = ?', [idUser]);
    done(null, rows[0]);
});
