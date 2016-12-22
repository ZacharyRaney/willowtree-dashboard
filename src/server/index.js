import express from 'express';
import OnTap from './ontap';

const port = 8080;
const app = express();
const ontap = new OnTap();

app.use(express.static('dist'));

app.get('/ontap', (req, res) => {
  res.send(ontap.response);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
