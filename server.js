const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const storeRoutes = require('./routes');

const app = express();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true,
    useFindAndModify : false
}).then(() => console.log("DB connected successfully"));

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', storeRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});