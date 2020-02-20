const addUser = 'INSERT INTO Usuarios set ?';
// const sel2Camp = 'Select * from Usuarios where idUser = ? and Nombre = ?'
const sel2Camp = 'Select * from Usuarios where idUser = ? and Nombre = ?';
const selUser = 'Select * from Usuarios where idUser = ?';
const selUserT = 'Select * from Usuarios';


module.exports = {
    addUser,
    sel2Camp,
    selUser,
    selUserT

}