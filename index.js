import express from 'express';
import loadata from './src/data-loader.js';
import Datastore from 'nedb';
import path from 'path';

const app = express();
const port = 4040;

app.get('/', (req, res) => {

    var db = new Datastore({
        filename: path.join(path.resolve(), "/tmp/database.db")
        , autoload: true
    });
    db.findOne({ name: 'anneka smith' }, function (err, doc) {
        console.log(err);
        console.log('Found user:', doc.name);
        res.send('Hello World!')
    });
});

app.get('/loadata', async (req, res) => {
    await loadata();
    res.sendStatus(200);

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


// https://github.com/Harsh-Tuwar/my_node_api


