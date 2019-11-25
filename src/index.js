import 'babel-polyfill';
require('dotenv').config();
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import Routes from './client/Routes';
import router from './database/router';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cookieParser());

router(app);

app.get('*', (req, res) => {
  const store = createStore(req);

  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  }).map(promise => {
    if (promise) {
      return new Promise((resolve, reject) => {
        promise.then(resolve).catch(resolve);
      });
    }
  });



  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, () => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  }).on('error', (err) => {
    console.log(`Error Code: ${err.code}`);
  });
});
