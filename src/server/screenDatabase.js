import { MongoClient } from 'mongodb';
import { DB_URL } from '../../.secrets/keys';
import { DEFAULT_SCREEN } from './defaultScreen';

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

  /**
   * Adds a new screen to the database with the default
   * layout and modules set in defaultScreen.js
   */
  newScreen(req, res) { // eslint-disable-line class-methods-use-this
    if (!(req.body.name && req.body.building && req.body.floor && req.body.room)) {
      res.status(500).send('Missing parameters');
      return;
    }
    MongoClient.connect(DB_URL, (err, db) => {
      if (err) throw err;
      const collection = db.collection('screens');
      const response = {
        name: req.body.name,
        building: req.body.building,
        floor: req.body.floor,
        room: req.body.room,
      };
      collection.insertOne(Object.assign(response, DEFAULT_SCREEN), (error) => {
        if (error) throw err;
        res.status(200).send(`Added ${req.body.name}`);
        db.close();
      });
    });
  }

}
export default ScreenDatabase;
