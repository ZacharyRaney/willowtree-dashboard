import express from 'express';
import OnTap from './ontap';
import ScreenDatabase from './screenDatabase';

const port = 8080;
const app = express();
const ontap = new OnTap();
const screenDatabase = new ScreenDatabase();

app.use(express.static('dist'));

app.get('/ontap', (req, res) => {
  res.send(ontap.response);
});

app.get('/screen/:id/data', screenDatabase.request);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
