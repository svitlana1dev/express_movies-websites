import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';

import indexRouter from './routes/routes.js';

const app = express();

app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err: any, req: any, res: any, next: any) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}`);
});
