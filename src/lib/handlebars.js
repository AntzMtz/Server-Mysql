const { format } = require('timeago.js');

// var fecha = new Date();
var fecha = '2020-02-18T16:58:00.375Z';
const helpers = {};

helpers.timeago1 = () => {
    console.log(fecha);

    return format(fecha);
}
module.exports = helpers;