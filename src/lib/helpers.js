const bcry = require('bcryptjs');

const helpers = {};
helpers.encypass = async (password) => {
    const passCry = await bcry.genSalt(10);
    const hash = await bcry.hash(password, passCry);
    return hash;
}

helpers.matchpass = async (password, savePassword) => {
    try {
        await bcry.compare()    
    } catch (error) {
        console.log(e);
        
    }
    
}
module.exports = helpers;