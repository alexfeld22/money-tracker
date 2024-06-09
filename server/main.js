// import 'dotenv/config';
const express = require('express');
const transactions = require('./src/routes/transactions/transactions');
const home = require('./src/routes/home/home');
const helmet = require('helmet');



const app = express();

app.use(helmet());
app.use('/api/transactions', transactions);
app.use('/', home);



const PORT = process.env.PORT || 3000;

app.use(express.json());


const port = process.env.PORT||3000; 
app.listen(port, () => console.log(`Listening on port ${port}...`));