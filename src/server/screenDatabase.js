import { MongoClient } from 'mongodb';
import { DB_URL } from '../../.secrets/keys';

class ScreenDatabase {

  request(req, res) { // eslint-disable-line class-methods-use-this
    MongoClient.connect(DB_URL, (err, db) => {
      if (err) throw err;
      const collection = db.collection('screens');
      const params = ((req.params.id === 'all') ? { name: 'default' } : { name: req.params.id });
      collection.findOne(params, (error, doc) => {
        if (error) {
          console.log(`Err on databse request: ${err}`);
        } else {
          res.json(doc);
        }
        db.close();
      });
    });
  }

  requestGroup(req, res) {  // eslint-disable-line class-methods-use-this
    MongoClient.connect(DB_URL, (err, db) => {
      if (err) throw err;
      const collection = db.collection('screens');
      const params = {};
      params[req.params.group] = req.params.id;
      collection.findOne(params, (error, doc) => {
        if (error) {
          console.log(`Err on databse request: ${err}`);
        } else {
          res.json(doc);
        }
        db.close();
      });
    });
  }

  requestList(req, res) { // eslint-disable-line class-methods-use-this
    MongoClient.connect(DB_URL, (err, db) => {
      if (err) throw err;
      const collection = db.collection('screens');
      const data = [];
      collection.find({}).sort({ building: 1, floor: 1, room: 1, name: 1 }).forEach((doc) => {
        data.push(
          {
            name: doc.name,
            building: doc.building,
            floor: doc.floor,
            room: doc.room,
          }
        );
      }, (error) => {
        if (error) throw error;
        res.json(data);
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

  update(req, res) {  // eslint-disable-line class-methods-use-this
    MongoClient.connect(DB_URL, (err, db) => {
      if (err) throw err;
      const collection = db.collection('screens');
      collection.updateOne({ name: req.params.id }, {
        $set: {
          modules: req.body.modules,
          layout: req.body.layout,
        },
      }, (error) => {
        if (error) throw err;
        res.send('Success!');
        db.close();
      });
    });
  }

  updateGroup(req, res) { // eslint-disable-line class-methods-use-this
    MongoClient.connect(DB_URL, (err, db) => {
      if (err) throw err;
      const collection = db.collection('screens');
      const params = {};
      params[req.params.group] = req.params.id;
      collection.updateMany(params, {
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
