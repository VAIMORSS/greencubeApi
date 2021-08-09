import fs from 'fs';
import { dirname } from 'path';
import Datastore from 'nedb';
import path from 'path';

const loadata = async () => {

    var db = new Datastore({
        filename: path.join(path.resolve(), "/tmp/database.db")
        , autoload: true
    });

    db.loadDatabase();
    console.log(dirname);
    fs.readFile(`./src/GC_assignment_data.json`, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        let jsonData = JSON.parse(data);
        db.insert(jsonData.data, function (err, doc) {
            console.log('Inserted', doc.name, 'with ID', doc._id);
        });
    });
}

export default loadata;