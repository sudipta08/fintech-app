const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fintech', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connection to database established'))
    .catch(err => console.log('Connection to database failed:', err.message));