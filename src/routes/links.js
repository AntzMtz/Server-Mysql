const express = require('express');
const router = express.Router();
const pool = require('../database');
const indexControler = require('../controls/dbInst');
const {isLoggedIn}=require('../lib/auth')

router.get('/add', (req, res) => {
    res.render('./links/add')
});

router.post('/add',isLoggedIn, async(req, res) => {
    console.log("Log de respuesta: " + JSON.stringify(req.body));
    const { Id, Name, pass } = req.body

    const newLink = {
        idUser: Id,
        Nombre: Name,
        Password: pass
    };
    await pool.query(indexControler.addUser, [newLink]);
    console.log(newLink);
    req.flash('success', 'Se Dio de Alta correctamente el usuario: ' + Id)
    res.redirect('/links')
});

router.get('/', isLoggedIn,async(req, res) => {
    const id = 'Antz';
    const name = 'Antonio Martinez';
    const links = await pool.query(indexControler.selUserT, [id, name]);
    console.log(links);
    res.render('links/list', { links });
});

router.get('/delete/:idUser', isLoggedIn, async(req, res) => {
    console.log("Hola: " + req.params.idUser);
    // res.send('eliminado');
    const { idUser } = req.params;
    await pool.query('delete from Usuarios where idUser = ?', [idUser])
    req.flash('success', 'Se Borro correctamente el usuario: ' + idUser)
    res.redirect('/links');

});

router.get('/edit/:idUser', isLoggedIn,async(req, res) => {
    console.log("Edit: " + req.params.idUser);
    const { idUser } = req.params;
    const link1 = await pool.query(indexControler.selUser, [idUser]);
    console.log(link1[0]);

    res.render('links/edit', { links: link1[0] });
});

router.post('/edit/:Id', isLoggedIn,async(req, res) => {
    const { Id } = req.params;
    const { Name, pass } = req.body;
    const idAnt = req.body.Id;
    const newLink = {
        idUser: idAnt,
        Nombre: Name,
        Password: pass
    };
    console.log(newLink);


    await pool.query('update Usuarios set ? where idUser = ?', [newLink, Id])
    req.flash('success', 'Se actualizo correctamente')
        // res.redirect('/links');
    res.redirect('/links')
});

module.exports = router;