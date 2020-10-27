const express = require('express');
const userRouter = require('./routes/users');
require('./db/mongoose');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type');
    next();
});

app.use('/api/user', userRouter);

//generic error handler
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

app.listen(process.env.PORT, () => console.log('Backend service started'));