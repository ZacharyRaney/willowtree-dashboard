import express from 'express';
import bodyParser from 'body-parser';
import OnTap from './ontap';
import ScreenDatabase from './screenDatabase';

const port = 8080;
const app = express();
const onTap = new OnTap();
const screenDatabase = new ScreenDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));

app.get('/ontap', onTap.update);
app.get('/screen/:id/data', screenDatabase.request);
app.get('/screen/all/list', screenDatabase.requestList);
app.get('/screen/group/:group/:id/data', screenDatabase.requestGroup);

app.post('/screen/all/update', screenDatabase.updateAll);
app.post('/screen/:id/update', screenDatabase.update);
app.post('/screen/group/:group/:id/update', screenDatabase.updateGroup);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
