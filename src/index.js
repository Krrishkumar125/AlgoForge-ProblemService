const express = require('express');
const bodyParser = require('body-parser');

const { PORT, NODE_ENV } = require('./config/server.config');
const apiRouter = require('./routes');
const { errorHandler } = require('./utils');
const connectToDB = require('./config/db.config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
    return res.json({ message: "Problem Service is alive" });
});

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server started at PORT ${PORT} in ${NODE_ENV} environment`);
    await connectToDB();
    console.log("Successfully connected to DB");
});
