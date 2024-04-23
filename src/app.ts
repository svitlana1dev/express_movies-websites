import createError from 'http-errors';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import contentSecurityPolicy from 'helmet-csp';
import status from 'http-status';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

import indexRouter from './routes/routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(
  contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "http://api.themoviedb.org/3", "https://ajax.googleapis.com", "https://maxcdn.bootstrapcdn.com"],
      imgSrc: ["'self'", "data:", "http://image.tmdb.org"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
    reportOnly: false,
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(status.NOT_FOUND));
});

app.use(function(err: any, req: any, res: any, next: any) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || status.INTERNAL_SERVER_ERROR);
  res.render('error');
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}`);
});
