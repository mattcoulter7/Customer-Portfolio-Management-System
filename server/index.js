const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const queryRouter = require('./routers/query');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/cpms', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'))

app.use('/query', queryRouter);
app.listen(3001);