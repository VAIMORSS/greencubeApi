import express from 'express';
import loadata from './src/data-loader.js';
import Datastore from 'nedb';
import path from 'path';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4040;
const USERS_PER_PAGE = 20;

const corsOptions = {
    origin: ['*'],
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

var db = new Datastore({
    filename: path.join(path.resolve(), "/tmp/database.db")
    , autoload: true
});

app.get('/users', (req, res) => {
    db.find({}).skip((req.query.page - 1) * (USERS_PER_PAGE)).limit(req.query.limit).exec((err, docs) => {
        res.send(docs);
    })
})

app.get('/users/search', (req, res) => {
    db.find({ name: new RegExp(`${req.query.query}`) }
    ).limit(USERS_PER_PAGE).exec((err, docs) => {
        res.send(docs);
    })
})

app.get('/users/dashboardinfo', async (req, res) => {
    db.count({ interest: req.query.interest }, (err, count) => {
        res.send(`${count}`);
    })

})

app.get('/loadata', async (req, res) => {
    await loadata();
    res.sendStatus(200);
})

app.listen(port, () => {
    //for the dev purpose
});



