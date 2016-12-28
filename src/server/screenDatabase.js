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
          res.send(doc);
        }
        db.close();
      });
    });
  }

}
export default ScreenDatabase;
