import express from 'express';

const app = express();

const port = 4000;

require('./app/routes')(app);

app.listen(port, () =>{
    console.log('This is backend Api challenge')
});