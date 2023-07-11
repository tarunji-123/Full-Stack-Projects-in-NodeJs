const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequeilize = require('./data/database');
const newUserRoutes = require('./routes/user');

const expenseRouter = require('./routes/expense');

const app = express();
app.use(cors());

app.use(bodyParser.json({extended : false}));
app.use('/user',newUserRoutes);
app.use('/expenses',expenseRouter);

sequeilize.sync()
.then(result => console.log('database synced'))
.catch(err => console.log(err));

app.listen(3000);

