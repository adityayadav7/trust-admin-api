import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import { router } from './routes/route';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from './common/logger';
import { router } from './routers/authentication';
import {  initSetup, tokenValidation } from './auth/utils/utils';
import { adminRouter } from './routers/admin';

const app: Application = express();
const port: number = 5002;
app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://lalitkedia:9dqMg232siY6kVvX@cluster0.ahb1o5t.mongodb.net/grants?retryWrites=true&w=majority', {

})
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('MongoDB connection error:', error);
  });
app.use('/',router);
app.use('/',adminRouter)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, School Admission App');
  });
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
initSetup('admin', '1233', 'true')
// tokenValidation('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTcxMTA4NTk2NiwiZXhwIjoxNzExMjU4NzY2LCJpc3MiOiJkbWFydEFTTCJ9.pW_BFpKcS75lEt48yw2ZBOPKY7Se7REcIdlbQNdv-LQ',
// 'admin'
// )
