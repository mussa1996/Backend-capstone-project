const express =require('express');
const dbConection = require('./database/DbConnection');
const routes = require('./routers/Index');
const bodyParser = require('body-parser');


const app = express();
dbConection();
app.use(function (res, req, next) {
    req.header("Access-control-Allow-Origin", "*");
    req.header("Access-control-Allow-Headers", "Origin,x-Requested-with, Content-Type, Accept,Authorization");
    if (req.method === 'OPTIONS') {
        req.header('Access-control-Allow-Methods', 'PUT', 'POST', 'GET', 'DELETE');
    }
    next();
}) 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.json({extended: false}));
app.use(bodyParser.json()); 
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
}
);
app.use ('/api',routes);

app.get('/', (req, res) => {
    res.send('Welcome to my capstone project');
    });
    module.exports=app;
