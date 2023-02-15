const bills = require('./bills');

const constructorMethod = (app) => {
    app.use('/items', bills);
  
    app.use('*', (req, res) => {
        res.status(404).send("Page not found");
    });
};
  
module.exports = constructorMethod;
