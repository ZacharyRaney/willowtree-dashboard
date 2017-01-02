import { MongoClient } from 'mongodb';
import { DB_URL } from '../../.secrets/keys';

class ScreenDatabase {

  request(req, res) { // eslint-disable-line class-methods-use-this
    MongoClient.connect(DB_URL, (err, db) => {
      if (err) throw err;
      const collection = db.collection('screens');
      collection.findOne({ name: req.params.id }, (error, doc) => {
        if (error) {
          console.log(`Err on databse request: ${err}`);
        } else {
          res.json(doc);
        }
        db.close();
      });
    });
  }

  updateAll(req, res) { // eslint-disable-line class-methods-use-this
    MongoClient.connect(DB_URL, (err, db) => {
      if (err) throw err;
      const collection = db.collection('screens');
      collection.updateMany({}, {
        $set: {
          modules: req.body.modules,
          layout: req.body.layout,
        },
      }, (error, r) => {
        if (error) throw err;
        res.send(`Success! Updated ${r.result.n} entries`);
        db.close();
      });
    });
  }

}
export default ScreenDatabase;
